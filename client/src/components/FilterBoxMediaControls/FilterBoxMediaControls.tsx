import { Text, Box, GridItem, IconButton } from '@chakra-ui/react';
import {
  TiMediaRewind,
  TiMediaPlay,
  TiMediaStop,
  TiMediaFastForward,
} from 'react-icons/ti';

export const FilterBoxMediaControls = () => {
  return (
    <GridItem marginTop={2}>
      <Text>Controls</Text>
      <Box display='flex' gap={2}>
        <IconButton icon={<TiMediaRewind />} aria-label='' />
        <IconButton icon={<TiMediaPlay />} aria-label='' />
        <IconButton icon={<TiMediaStop />} aria-label='' />
        <IconButton icon={<TiMediaFastForward />} aria-label='' />
      </Box>
    </GridItem>
  );
};
