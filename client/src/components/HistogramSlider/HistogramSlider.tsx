import { useState, useMemo } from "react";
import { bin, scaleLinear, max, extent } from "d3";
import { Box, Text, Flex, Input, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react";
import { MdGraphicEq } from "react-icons/md";
import { FormInput } from "../Forms/FormInput";
import { max as _max} from "lodash";

interface HistogramSliderProps {
    data: number[];
    height: number;
    width: number;
    mode: string;
}

export const HistogramSlider = ({ data, mode, height, width }: HistogramSliderProps) => {
    const initialSliderValues = [0, _max(data)!];
    const [sliderValues, setSliderValues] = useState(initialSliderValues);
    const x = scaleLinear()
        .domain(extent(data) as [number, number])
        .range([0, width])
    const bins = bin()
        .domain(x.domain() as [number, number])
        .thresholds(x.ticks(initialSliderValues[1]))(data)
        .map((bin) => ({
            ...bin,
            length: bin.length,
            isSelected: mode === 'value' 
                ? bin.x0! >= sliderValues[0] && bin.x1! <= sliderValues[0] + 1
                : bin.x0! >= sliderValues[0] && bin.x1! <= sliderValues[1],
        }))
    const y = scaleLinear()
        .range([height, 0])
        .domain([0, max(bins, d => d.length) as number]);

    const histogramBars = useMemo(() => bins.map(
        (bin, idx) => (
            <rect
                key={idx}
                x={x(bin.x0!) + 1}
                y={y(bin.length)}
                width={x(bin.x1!) - x(bin.x0!) - 1}
                height={height - y(bin.length)}
                fill={bin.isSelected ? 'tomato': 'lightgray'}
                opacity={bin.isSelected ? 1 : 0.5}
          />
        )
    ), [bins])

    const renderSlider = () => {
        return mode === 'value'
        ? <Slider 
            defaultValue={initialSliderValues[0]} 
            value={sliderValues[0]}
            onChange={val => setSliderValues([val, val + 1])}
            max={initialSliderValues[1]}
        >
            <SliderTrack bg='red.100'>
                <SliderFilledTrack bg='tomato' />
            </SliderTrack>
            <SliderThumb boxSize={4} defaultValue={sliderValues[0]}>
                <Box color='tomato' as={MdGraphicEq} />
            </SliderThumb>
        </Slider>
        : <RangeSlider
                value={sliderValues}
                onChange={setSliderValues}
                min={initialSliderValues[0]}
                max={initialSliderValues[1]}
            >
                <RangeSliderTrack bg='red.100'>
                    <RangeSliderFilledTrack bg='tomato' />
                </RangeSliderTrack>
                <RangeSliderThumb 
                    boxSize={4}
                    index={0} 
                    defaultValue={sliderValues[0]}
                >
                    <Box color='tomato' as={MdGraphicEq} />
                </RangeSliderThumb>
                <RangeSliderThumb 
                    boxSize={4} 
                    index={1} 
                    defaultValue={sliderValues[1]}
                >
                    <Box color='tomato' as={MdGraphicEq} />
                </RangeSliderThumb>
            </RangeSlider>
    }

    return (
    <Box>
        <svg height={height} style={{marginBottom: '-12px'}}>
            <g id="histogram">
                {histogramBars}
            </g>
        </svg>
        {renderSlider()}
        <Flex alignItems='center' justifyContent='space-between'>
            {
            mode === 'value' 
            ?  <FormInput label='Value' name='variable-value' fieldError={undefined}>
                    <Input 
                        type='number'
                        defaultValue={initialSliderValues[0]}
                        value={sliderValues[0]}
                        onChange={
                            ({ currentTarget: { valueAsNumber: val } }) => setSliderValues([
                                val, 
                                val < initialSliderValues[1] ? val + 1 : initialSliderValues[1]
                            ])
                        }
                        min={initialSliderValues[0]}
                        max={initialSliderValues[1] - 1}
                    />
                </FormInput>
            : <>
                <FormInput label='Min' name='min-range-value' fieldError={undefined}>
                    <Input 
                        type='number'
                        defaultValue={initialSliderValues[0]} 
                        value={sliderValues[0]}
                        onChange={e => setSliderValues([e.currentTarget.valueAsNumber, sliderValues[1]])}
                        min={initialSliderValues[0]}
                        max={sliderValues[1]} 
                    />
                </FormInput>
                <Text marginTop={6}> to </Text>
                <FormInput label='Max' name='max-range-value' fieldError={undefined}>
                    <Input 
                        type='number' 
                        defaultValue={initialSliderValues[1]}
                        value={sliderValues[1]}
                        onChange={e => setSliderValues([sliderValues[0], e.currentTarget.valueAsNumber])}
                        min={sliderValues[0] + 1}
                        max={initialSliderValues[1]}
                    />
                </FormInput>
            </>
        }
        </Flex>
    </Box>
    );
};
