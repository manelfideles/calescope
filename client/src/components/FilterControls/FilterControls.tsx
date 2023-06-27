import { Grid, GridItem } from '@chakra-ui/react';
import { FilterBox } from '../FilterBox';
import { useMemo } from 'react';
import { User } from '../../utils/types';
import { generateHistogramData } from '../../utils/mockData';
import { max } from 'lodash';
import { D3Histogram } from '../d3-graphs/D3Histogram';
import { GraphSliderContextProvider } from '../../hooks/useGraphSlider';

const histogramData = generateHistogramData(5000, 8);
const defaultSliderValues = [0, max(histogramData)!];

export const FilterControls = () => {
  const visibleVariables = useMemo(() => {
    const {
      userSettings: { variables },
    }: User = JSON.parse(localStorage.getItem('settings') ?? '');
    return variables
      .filter((v) => v.isSelected)
      .map((v) => (
        <GridItem padding={2} key={v.id}>
          <GraphSliderContextProvider
            defaultSliderValues={defaultSliderValues!}
          >
            <FilterBox
              title={v.name}
              graphComponent={
                <D3Histogram data={histogramData} height={50} width={190} />
              }
            />
          </GraphSliderContextProvider>
        </GridItem>
      ))
      .concat([
        <GridItem padding={2} key='time'>
          <FilterBox title='Time' isTimeFilter />
        </GridItem>,
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
        </GridItem>,
      ]);
  }, []);

  return <Grid>{visibleVariables}</Grid>;
};
