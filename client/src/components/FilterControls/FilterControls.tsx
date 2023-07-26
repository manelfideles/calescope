import { Grid, GridItem } from '@chakra-ui/react';
import { FilterBox } from '../FilterBox';
import { useMemo } from 'react';
import { User } from '../../utils/types';
import { GraphSliderContextProvider } from '../../hooks/useGraphSlider';
import { useLocalStorage } from 'usehooks-ts';

const defaultUserValues: User = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  userSettings: {
    variables: [],
    unitSystem: 'metric',
  },
};

export const FilterControls = () => {
  const [
    {
      userSettings: { variables },
    },
    _setSettings,
  ] = useLocalStorage<User>('settings', defaultUserValues);
  const visibleVariables = useMemo(() => {
    return variables
      .filter(({ isSelected }) => isSelected)
      .map(({ name, id }) => (
        <GridItem padding={2} key={id}>
          <GraphSliderContextProvider variableId={id}>
            <FilterBox title={name} withGraphComponent graphType='histogram' />
          </GraphSliderContextProvider>
        </GridItem>
      ));
  }, [variables]);

  return (
    <Grid>
      {/* Dynamic Variables */}
      {visibleVariables}
      {/* Static Variables */}
      <GridItem padding={2} key='time'>
        <GraphSliderContextProvider variableId={-2}>
          <FilterBox title='Time' />
        </GraphSliderContextProvider>
      </GridItem>
      <GridItem padding={2} key='altitude'>
        {/* in the RPC, we use -1 to as the "altitude" variable's key */}
        <GraphSliderContextProvider variableId={-1}>
          <FilterBox
            title='Altitude'
            withGraphComponent
            graphType='sparkline'
          />
        </GraphSliderContextProvider>
      </GridItem>
    </Grid>
  );
};
