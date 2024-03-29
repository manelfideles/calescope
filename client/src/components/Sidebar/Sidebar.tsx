import { Box, Text, IconButton } from '@chakra-ui/react';
import { FilterControls } from '../FilterControls';
import { BiChevronLeft } from 'react-icons/bi';
import { AiFillHome } from 'react-icons/ai';

const SidebarHeader = () => (
  <Box
    display='flex'
    alignItems='center'
    justifyContent='space-between'
    margin={2}
    padding={2}
    bg='white'
    border='1px solid gray'
    rounded='lg'
  >
    <IconButton
      as='a'
      variant='link'
      href='/'
      icon={<AiFillHome />}
      color='black'
      aria-label='Go home'
      marginLeft={-2.5}
    />
    <Text fontWeight='bold' marginLeft={-4}>
      Calescope
    </Text>
    <IconButton
      bg='none'
      border='1px solid black'
      padding='0.25rem'
      size='56px'
      aria-label='show/hide'
      icon={<BiChevronLeft />}
    />
  </Box>
);

export const Sidebar = () => {
  return (
    <Box
      width='14rem'
      display='flex'
      flexDirection='column'
      position='fixed'
      inset='0 0 0'
      h='fit-content'
      zIndex={1}
    >
      <SidebarHeader />
      <FilterControls />
    </Box>
  );
};
