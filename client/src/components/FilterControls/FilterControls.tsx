import { Button, Grid, GridItem } from '@chakra-ui/react';
import { FilterBox } from '../FilterBox';
import { useMemo } from 'react';
import { User } from '../../utils/types';
import { GraphSliderContextProvider } from '../../hooks/useGraphSlider';
import { useForm } from 'react-hook-form';
import { Form } from '../Forms/Form';
import { convertDateToTimestamptz as dateConverter } from '../../utils/misc';

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
          <GraphSliderContextProvider variableId={id}>
            <FilterBox title={name} withGraphComponent />
          </GraphSliderContextProvider>
        </GridItem>
      ));
  }, []);

  return (
    <Form form={form} onSubmit={() => console.log(form.getValues())}>
      <Grid>
        {/* Dynamic Variables */}
        {visibleVariables}

        {/* Static Variables */}
        <GridItem padding={2} key='time'>
          <GraphSliderContextProvider variableId={-2}>
            <FilterBox title='Time' withGraphComponent={false} />
          </GraphSliderContextProvider>
        </GridItem>
        <GridItem padding={2} key='altitude'>
          {/* in the RPC, we use -1 to as the "altitude" variable's key */}
          <GraphSliderContextProvider variableId={-1}>
            <FilterBox title='Altitude' withGraphComponent />
          </GraphSliderContextProvider>
        </GridItem>
        <GridItem>
          <Button type='submit'>Search</Button>
        </GridItem>
      </Grid>
    </Form>
  );
};
