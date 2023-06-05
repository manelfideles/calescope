import {
  Box,
  Text,
  Tooltip,
  IconButton,
  Grid,
  GridItem,
  useColorModeValue,
  useDisclosure,
  Collapse,
  Icon,
  As,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
  Button,
} from '@chakra-ui/react';
import {
  TiMediaFastForward,
  TiMediaPlay,
  TiMediaRewind,
  TiMediaStop,
} from 'react-icons/ti';
import { BiArrowToTop, BiArrowToBottom } from 'react-icons/bi';
import { HistogramSlider } from '../HistogramSlider';
import { useState } from 'react';

interface FilterBoxProps {
  title: string;
  icon?: As<any>;
  isTimeFilter?: boolean;
  mode: 'range' | 'value';
}

// mock data
const histogramData = Array.from({ length: 5000 }, () =>
  Math.floor(Math.random() * 8)
);

export const FilterBox = ({ title, icon }: FilterBoxProps) => {
  const { isOpen, onToggle } = useDisclosure();
  const [mode, setMode] = useState<string>('value');

  return (
    <Box
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
      border='1px solid gray'
      p={2}
    >
      <Grid>
        <GridItem>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
          >
            <Tooltip
              label={`This variable represents the ${title.toLowerCase()} variable you've uploaded to the platform.`}
              placement='start'
            >
              <Icon as={icon} />
            </Tooltip>
            <Text fontWeight='bold'>{title}</Text>
            <IconButton
              bg='none'
              onClick={onToggle}
              border='1px solid black'
              padding='0.25rem'
              size='56px'
              aria-label='collapse/expand'
              icon={isOpen ? <BiArrowToTop /> : <BiArrowToBottom />}
            />
          </Box>
        </GridItem>
        <Collapse in={isOpen} animateOpacity>
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
            <HistogramSlider
              data={histogramData}
              mode={mode}
              height={50}
              width={190}
            />
          </GridItem>
          <GridItem marginTop={2}>
            <Text>Controls</Text>
            <Box display='flex' gap={2}>
              <IconButton icon={<TiMediaRewind />} aria-label='' />
              <IconButton icon={<TiMediaPlay />} aria-label='' />
              <IconButton icon={<TiMediaStop />} aria-label='' />
              <IconButton icon={<TiMediaFastForward />} aria-label='' />
            </Box>
          </GridItem>
        </Collapse>
      </Grid>
    </Box>
  );
};
