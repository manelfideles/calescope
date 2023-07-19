import {
  Box,
  Text,
  Flex,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  NumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  Spinner,
} from '@chakra-ui/react';
import { MdGraphicEq } from 'react-icons/md';
import { useGraphSlider } from '../../hooks/useGraphSlider';
import { FormInput } from '../Forms/FormInput';
import { useMemo } from 'react';

interface GraphSliderProps {
  graphComponent: React.ReactNode;
}

const NumberInputComponents = (
  <>
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </>
);

export const GraphSlider = ({ graphComponent }: GraphSliderProps) => {
  const {
    mode,
    sliderRange,
    sliderValues,
    setSliderValues,
    isLoadingSliderRange,
  } = useGraphSlider();

  const MIN_SLIDER_VALUE = useMemo(() => sliderRange?.[0] ?? 0, [sliderRange]);
  const MAX_SLIDER_VALUE = useMemo(() => sliderRange?.[1] ?? 25, [sliderRange]);

  const sliderThumbInputs =
    mode === 'value' ? (
      <Slider
        defaultValue={MIN_SLIDER_VALUE}
        value={sliderValues[0]}
        onChange={(val) => setSliderValues([val, val + 1])}
        min={MIN_SLIDER_VALUE}
        max={MAX_SLIDER_VALUE}
      >
        <SliderTrack bg='red.100'>
          <SliderFilledTrack bg='tomato' />
        </SliderTrack>
        <SliderThumb boxSize={4} defaultValue={MIN_SLIDER_VALUE}>
          <Box color='tomato' as={MdGraphicEq} />
        </SliderThumb>
      </Slider>
    ) : (
      <RangeSlider
        value={sliderValues}
        aria-label={['min', 'max']}
        onChange={setSliderValues}
        min={MIN_SLIDER_VALUE}
        max={MAX_SLIDER_VALUE}
      >
        <RangeSliderTrack bg='red.100'>
          <RangeSliderFilledTrack bg='tomato' />
        </RangeSliderTrack>
        <RangeSliderThumb boxSize={4} index={0} defaultValue={MIN_SLIDER_VALUE}>
          <Box color='tomato' as={MdGraphicEq} />
        </RangeSliderThumb>
        <RangeSliderThumb boxSize={4} index={1} defaultValue={MAX_SLIDER_VALUE}>
          <Box color='tomato' as={MdGraphicEq} />
        </RangeSliderThumb>
      </RangeSlider>
    );

  const sliderFormInputs =
    mode === 'value' ? (
      <FormInput
        label='Value'
        name='variable-value'
        fieldError={undefined}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 55,
        }}
      >
        <NumberInput
          size='sm'
          defaultValue={MIN_SLIDER_VALUE}
          value={sliderValues[0]}
          onChange={(_valueAsString, valueAsNumber) =>
            setSliderValues([
              valueAsNumber,
              valueAsNumber < MAX_SLIDER_VALUE
                ? valueAsNumber + 1
                : MAX_SLIDER_VALUE,
            ])
          }
          min={MIN_SLIDER_VALUE}
          max={MAX_SLIDER_VALUE}
        >
          {NumberInputComponents}
        </NumberInput>
      </FormInput>
    ) : (
      <>
        <FormInput
          label='Min'
          name='min-range-value'
          fieldError={undefined}
          style={{ width: '100%' }}
        >
          <NumberInput
            size='sm'
            value={sliderValues[0]}
            onChange={(_valueAsString, valueAsNumber) =>
              setSliderValues([valueAsNumber, sliderValues[1]])
            }
            min={MIN_SLIDER_VALUE}
            max={sliderValues[1]}
          >
            {NumberInputComponents}
          </NumberInput>
        </FormInput>
        <Text marginTop={6} px={2}>
          -
        </Text>
        <FormInput
          label='Max'
          name='max-range-value'
          fieldError={undefined}
          style={{ width: '100%' }}
        >
          <NumberInput
            size='sm'
            value={sliderValues[1]}
            onChange={(_valueAsString, valueAsNumber) =>
              setSliderValues([sliderValues[0], valueAsNumber])
            }
            min={sliderValues[0] + 1}
            max={MAX_SLIDER_VALUE}
          >
            {NumberInputComponents}
          </NumberInput>
        </FormInput>
      </>
    );

  return (
    <Box>
      {isLoadingSliderRange && !sliderRange ? (
        <Flex alignItems='center' justifyContent='center'>
          <Spinner size='sm' />
        </Flex>
      ) : (
        <>
          {graphComponent}
          {sliderThumbInputs}
          <Flex alignItems='center' mt={3}>
            {sliderFormInputs}
          </Flex>
        </>
      )}
    </Box>
  );
};
