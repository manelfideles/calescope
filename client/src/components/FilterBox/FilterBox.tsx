import {
  Text,
  GridItem,
  useDisclosure,
  Collapse,
  Select,
} from '@chakra-ui/react';
import { GraphSlider } from '../GraphSlider';
import { max as _max } from 'lodash';
import { FilterBoxMediaControls } from '../FilterBoxMediaControls';
import { Card } from '../Card';
import { useGraphSlider } from '../../hooks/useGraphSlider';

interface FilterBoxProps {
  title: string;
  isTimeFilter?: boolean;
  graphComponent?: React.ReactNode;
}

export const FilterBox = ({
  title,
  isTimeFilter,
  graphComponent,
}: FilterBoxProps) => {
  const { isOpen, onToggle } = useDisclosure();
  const { setMode, defaultSliderValues } = useGraphSlider();

  return (
    <>
      <Card
        title={title}
        hasTooltip
        tooltipText={`This variable represents the ${title.toLowerCase()} variable you've uploaded to the platform.`}
        onToggle={onToggle}
        isOpen={isOpen}
      >
        <Collapse in={isOpen} animateOpacity>
          {!defaultSliderValues && isTimeFilter ? (
            <Text>To-do</Text>
          ) : (
            <>
              <GridItem
                marginTop={2}
                display='flex'
                justifyContent='space-between'
                alignItems='center'
              >
                <Text>Mode</Text>
                <Select
                  defaultValue='value'
                  size='sm'
                  width='fit-content'
                  onChange={(e) => setMode(e.currentTarget.value)}
                >
                  <option value='value'>Value</option>
                  <option value='range'>Range</option>
                </Select>
              </GridItem>
              <GridItem marginTop={2} alignItems='center'>
                <GraphSlider graphComponent={graphComponent} />
              </GridItem>
              <FilterBoxMediaControls />
            </>
          )}
        </Collapse>
      </Card>
    </>
  );
};
