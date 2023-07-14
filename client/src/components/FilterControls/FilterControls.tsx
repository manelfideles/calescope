import { Button, Grid, GridItem } from '@chakra-ui/react';
import { FilterBox } from '../FilterBox';
import { useMemo } from 'react';
import { User } from '../../utils/types';
import { generateHistogramData } from '../../utils/mockData';
import { max } from 'lodash';
import { D3Histogram } from '../d3-graphs/D3Histogram';
import { GraphSliderContextProvider } from '../../hooks/useGraphSlider';
import { useForm } from 'react-hook-form';
import { Form } from '../Forms/Form';
import { convertDateToTimestamptz as dateConverter } from '../../utils/misc';

const histogramData = generateHistogramData(5000, 8);
const defaultSliderValues = [0, max(histogramData)!];

type SliderValuesType = {
  mode: 'value' | 'range';
  val: (string | number) | Array<string | number>;
};

export const FilterControls = () => {
  const {
    userSettings: { variables },
  }: User = JSON.parse(localStorage.getItem('settings') ?? '') ?? [];
  const defaultValues = variables
    .filter(({ isSelected }) => isSelected as boolean)
    .map(({ name }) => name.toLocaleLowerCase())
    .concat(['altitude', 'time'])
    .reduce(
      (prevVal, curVal) => ({
        ...prevVal,
        [curVal]: {
          mode: 'value' as const,
          val: curVal == 'time' ? dateConverter(new Date()) : 0,
        },
      }),
      {}
    );
  const form = useForm<Record<string, SliderValuesType>>({ defaultValues });

  const visibleVariables = useMemo(() => {
    return variables
      .filter(({ isSelected }) => isSelected)
      .map(({ name, id }) => (
        <GridItem padding={2} key={id}>
          <GraphSliderContextProvider
            defaultSliderValues={defaultSliderValues!}
          >
            <FilterBox
              title={name}
              graphComponent={
                <D3Histogram data={histogramData} height={50} width={190} />
              }
            />
          </GraphSliderContextProvider>
        </GridItem>
      ));
  }, []);

  return (
    <Form form={form} onSubmit={() => console.log(form.getValues())}>
      <Grid>
        {visibleVariables}
        <GridItem padding={2} key='time'>
          <FilterBox title='Time' isTimeFilter />
        </GridItem>
        <GridItem padding={2} key='altitude'>
          <GraphSliderContextProvider
            defaultSliderValues={defaultSliderValues!}
          >
            <FilterBox
              title='Altitude'
              graphComponent={
                <D3Histogram data={histogramData} height={50} width={190} />
              }
            />
          </GraphSliderContextProvider>
        </GridItem>
        <GridItem>
          <Button type='submit'>Search</Button>
        </GridItem>
      </Grid>
    </Form>
  );
};
