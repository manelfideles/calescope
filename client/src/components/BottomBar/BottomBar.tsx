import { Box, Collapse, useDisclosure } from '@chakra-ui/react';
import { Card } from '../Card';

export const BottomBar = () => {
  const { onToggle, isOpen } = useDisclosure();
  return (
    <Box position='fixed' right={0} bottom='0' padding={2} display='flex'>
      <Box
        width='80vw'
        transition='bottom 1s ease-in-out'
        transform={isOpen ? 'none' : 'translateY(100%'}
        backgroundColor='white'
        borderRadius='md'
        boxShadow='md'
        overflow='hidden'
      >
        <Card title='Location Details' onToggle={onToggle} isOpen={!isOpen}>
          <Collapse in={isOpen} startingHeight={0} animateOpacity>
            <Box height='20rem'>placeholder</Box>
          </Collapse>
        </Card>
      </Box>
    </Box>
  );
};
