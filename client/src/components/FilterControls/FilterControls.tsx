import { Grid, GridItem } from '@chakra-ui/react';
import { FilterBox } from '../FilterBox';
import { useMemo } from 'react';
import { User } from '../../utils/types';

export const FilterControls = () => {
  const visibleVariables = useMemo(() => {
    const {
      userSettings: { variables },
    }: User = JSON.parse(localStorage.getItem('settings') ?? '');
    return variables
      .filter((v) => v.isSelected)
      .map((v) => (
        <GridItem padding={2} key={v.id}>
          <FilterBox title={v.name} mode='range' />
        </GridItem>
      ));
  }, []);

  return <Grid>{visibleVariables}</Grid>;
};
