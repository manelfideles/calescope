import {
  Box,
  Text,
  Flex,
  Input,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';
import { MdGraphicEq } from 'react-icons/md';
import { useGraphSlider } from '../../hooks/useGraphSlider';
import { FormInput } from '../Forms/FormInput';

interface GraphSliderProps {
  graphComponent: React.ReactNode;
}

export const GraphSlider = ({ graphComponent }: GraphSliderProps) => {
  const { mode, defaultSliderValues, sliderValues, setSliderValues } =
    useGraphSlider();

  const sliderThumbInputs =
    mode === 'value' ? (
      <Slider
        defaultValue={defaultSliderValues[0]}
        value={sliderValues[0]}
        onChange={(val) => setSliderValues([val, val + 1])}
        max={defaultSliderValues[1]}
      >
        <SliderTrack bg='red.100'>
          <SliderFilledTrack bg='tomato' />
        </SliderTrack>
        <SliderThumb boxSize={4} defaultValue={sliderValues[0]}>
          <Box color='tomato' as={MdGraphicEq} />
        </SliderThumb>
      </Slider>
    ) : (
      <RangeSlider
        value={sliderValues}
        onChange={setSliderValues}
        min={defaultSliderValues[0]}
        max={defaultSliderValues[1]}
      >
        <RangeSliderTrack bg='red.100'>
          <RangeSliderFilledTrack bg='tomato' />
        </RangeSliderTrack>
        <RangeSliderThumb boxSize={4} index={0} defaultValue={sliderValues[0]}>
          <Box color='tomato' as={MdGraphicEq} />
        </RangeSliderThumb>
        <RangeSliderThumb boxSize={4} index={1} defaultValue={sliderValues[1]}>
          <Box color='tomato' as={MdGraphicEq} />
        </RangeSliderThumb>
      </RangeSlider>
    );

  const sliderFormInputs =
    mode === 'value' ? (
      <FormInput label='Value' name='variable-value' fieldError={undefined}>
        <Input
          type='number'
          value={sliderValues[0]}
          onChange={({ currentTarget: { valueAsNumber: val } }) =>
            setSliderValues([
              val,
              val < defaultSliderValues[1] ? val + 1 : defaultSliderValues[1],
            ])
          }
          min={defaultSliderValues[0]}
          max={defaultSliderValues[1] - 1}
        />
      </FormInput>
    ) : (
      <>
        <FormInput label='Min' name='min-range-value' fieldError={undefined}>
          <Input
            type='number'
            value={sliderValues[0]}
            onChange={(e) =>
              setSliderValues([e.currentTarget.valueAsNumber, sliderValues[1]])
            }
            min={defaultSliderValues[0]}
            max={sliderValues[1]}
          />
        </FormInput>
        <Text marginTop={6}> to </Text>
        <FormInput label='Max' name='max-range-value' fieldError={undefined}>
          <Input
            type='number'
            value={sliderValues[1]}
            onChange={(e) =>
              setSliderValues([sliderValues[0], e.currentTarget.valueAsNumber])
            }
            min={sliderValues[0] + 1}
            max={defaultSliderValues[1]}
          />
        </FormInput>
      </>
    );

  return (
    <Box>
      {graphComponent}
      {sliderThumbInputs}
      <Flex alignItems='center' justifyContent='space-between'>
        {sliderFormInputs}
      </Flex>
    </Box>
  );
};
