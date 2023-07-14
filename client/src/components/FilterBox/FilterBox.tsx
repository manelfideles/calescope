import {
  GridItem,
  useDisclosure,
  Collapse,
  Select,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import { GraphSlider } from '../GraphSlider';
import { max as _max } from 'lodash';
import { FilterBoxMediaControls } from '../FilterBoxMediaControls';
import { Card } from '../Card';
import { useGraphSlider } from '../../hooks/useGraphSlider';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import {
  DATE_FORMAT,
  MONTHS,
  WEEKDAYS,
  convertDateToTimestamptz as dateConverter,
} from '../../utils/misc';
import { useFormContext } from 'react-hook-form';
import { FormInput } from '../Forms/FormInput';
import { D3Histogram } from '../d3-graphs/D3Histogram';
import { useEffect } from 'react';

interface FilterBoxProps {
  title: string;
  withGraphComponent?: boolean;
}

export const FilterBox = ({ title, withGraphComponent }: FilterBoxProps) => {
  const { isOpen, onToggle } = useDisclosure();
  const { histogramData, isLoadingHistogramData, setMode } = useGraphSlider();
  const { setValue, register } = useFormContext();

  return (
    <>
      <Card title={title} onToggle={onToggle} isOpen={isOpen}>
        <Collapse in={isOpen} animateOpacity>
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
                {...register(`${title.toLocaleLowerCase()}.mode`)}
                onChange={(e) => setMode(e.currentTarget.value)}
              >
                <option value='value'>Value</option>
                <option value='range'>Range</option>
              </Select>
            </FormInput>
          </GridItem>
          <GridItem marginTop={2} alignItems='center'>
            {!withGraphComponent ? (
              <FormInput name='time' fieldError={undefined} label={''}>
                <Calendar
                  formatLongDate={(_, date) => DATE_FORMAT[date.getDate()]}
                  formatMonthYear={(_, date) =>
                    MONTHS[date.getMonth()] +
                    " '" +
                    date.getFullYear().toString().substring(2)
                  }
                  formatMonth={(_, date) => MONTHS[date.getMonth()]}
                  formatShortWeekday={(_, date) => WEEKDAYS[date.getDay()]}
                  defaultValue={new Date()}
                  onChange={(d: any) => setValue('time.val', dateConverter(d))}
                />
              </FormInput>
            ) : isLoadingHistogramData ? (
              <Flex alignItems='center' justifyContent='center' padding={2}>
                <Spinner size='sm' />
              </Flex>
            ) : (
              <GraphSlider
                graphComponent={
                  <D3Histogram data={histogramData} height={50} width={190} />
                }
              />
            )}
          </GridItem>
          {/* <FilterBoxMediaControls /> */}
        </Collapse>
      </Card>
    </>
  );
};
