import {
  GridItem,
  useDisclosure,
  Collapse,
  Select,
  Spinner,
  Flex,
  Input,
} from '@chakra-ui/react';
import { GraphSlider } from '../GraphSlider';
import { max as _max } from 'lodash';
import { Card } from '../Card';
import { useGraphSlider } from '../../hooks/useGraphSlider';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import { useFormContext } from 'react-hook-form';
import { FormInput } from '../Forms/FormInput';
import { D3Histogram } from '../d3-graphs/D3Histogram';

interface FilterBoxProps {
  title: string;
  withGraphComponent?: boolean;
}

export const FilterBox = ({ title, withGraphComponent }: FilterBoxProps) => {
  const { isOpen, onToggle } = useDisclosure();
  const { histogramData, isLoadingHistogramData, setMode, mode } =
    useGraphSlider();
  const { register } = useFormContext();
  const formatInsertedDate = (date: string) =>
    !date.length ? '' : date.replace('T', ' ').slice(0, 16) + ':00+00';

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
              <>
                <FormInput
                  name='time'
                  label={mode === 'value' ? 'Datetime' : 'Start Datetime'}
                  fieldError={undefined}
                >
                  <Input
                    size='sm'
                    type='datetime-local'
                    defaultValue={new Date().toISOString().slice(0, 16)}
                    mb={4}
                    {...register('time.val', {
                      setValueAs: (v) => formatInsertedDate(v),
                    })}
                  />
                </FormInput>
                {mode === 'range' && (
                  <FormInput
                    name='time'
                    label='End Datetime'
                    fieldError={undefined}
                  >
                    <Input
                      size='sm'
                      type='datetime-local'
                      defaultValue={new Date().toISOString().slice(0, 16)}
                      mb={4}
                      {...register('time.val', {
                        setValueAs: (v) => formatInsertedDate(v),
                      })}
                    />
                  </FormInput>
                )}
              </>
            ) : isLoadingHistogramData ? (
              <Flex alignItems='center' justifyContent='center' padding={2}>
                <Spinner size='sm' />
              </Flex>
            ) : (
              <GraphSlider
                title={title.toLocaleLowerCase()}
                graphComponent={
                  <D3Histogram data={histogramData} height={75} width={173} />
                }
              />
            )}
          </GridItem>
        </Collapse>
      </Card>
    </>
  );
};
