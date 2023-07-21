import { Grid, GridItem } from '@chakra-ui/react';
import { FilterBox } from '../FilterBox';
import { useMemo } from 'react';
import { User } from '../../utils/types';
import { GraphSliderContextProvider } from '../../hooks/useGraphSlider';

export const FilterControls = () => {
  const {
    userSettings: { variables },
  }: User = JSON.parse(localStorage.getItem('settings') ?? '') ?? [];
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
    </Grid>
  );
};
