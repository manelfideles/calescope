import {
  GridItem,
  useDisclosure,
  Collapse,
  Select,
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
import { DATE_FORMAT, MONTHS, WEEKDAYS } from '../../utils/misc';
import { useFormContext } from 'react-hook-form';
import { FormInput } from '../Forms/FormInput';

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
  const form = useFormContext();

  return (
    <>
      <Card title={title} onToggle={onToggle} isOpen={isOpen}>
        <Collapse in={isOpen} animateOpacity>
          {isTimeFilter ? (
            <TimeFilter />
          ) : (
            <>
              <GridItem marginTop={2}>
                <FormInput
                  name='mode'
                  label='Mode'
                  fieldError={undefined}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Select
                    defaultValue='value'
                    size='sm'
                    width='fit-content'
                    {...form.register('mode')}
                    onChange={(e) => setMode(e.currentTarget.value)}
                  >
                    <option value='value'>Value</option>
                    <option value='range'>Range</option>
                  </Select>
                </FormInput>
              </GridItem>
              <GridItem marginTop={2} alignItems='center'>
                <GraphSlider graphComponent={graphComponent} />
              </GridItem>
              {/* <FilterBoxMediaControls /> */}
            </>
          )}
        </Collapse>
      </Card>
    </>
  );
};
