import {
  Text,
  GridItem,
  useDisclosure,
  Collapse,
  Select,
  Box,
  Flex,
} from '@chakra-ui/react';
import { GraphSlider } from '../GraphSlider';
import { max as _max } from 'lodash';
import { FilterBoxMediaControls } from '../FilterBoxMediaControls';
import { Card } from '../Card';
import { useGraphSlider } from '../../hooks/useGraphSlider';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const DATE_FORMAT = 'yyyy-MM-dd';

interface FilterBoxProps {
  title: string;
  isTimeFilter?: boolean;
  graphComponent?: React.ReactNode;
}

const TimeFilter = () => {
  const [date, setDate] = useState(new Date());
  return (
    <Flex>
      <Calendar
        formatLongDate={(_locate, date) => DATE_FORMAT[date.getDate()]}
        formatMonthYear={(_locale, date) =>
          MONTHS[date.getMonth()] +
          " '" +
          date.getFullYear().toString().substring(2)
        }
        formatMonth={(_locale, date) => MONTHS[date.getMonth()]}
        formatShortWeekday={(_locale, date) => WEEKDAYS[date.getDay()]}
        onChange={(newDate: any) => setDate(newDate)}
        value={date}
      />
    </Flex>
  );
};

export const FilterBox = ({
  title,
  isTimeFilter,
  graphComponent,
}: FilterBoxProps) => {
  const { isOpen, onToggle } = useDisclosure();
  const { setMode } = useGraphSlider();

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
          {isTimeFilter ? (
            <TimeFilter />
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
