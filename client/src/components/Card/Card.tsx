import {
  Grid,
  GridItem,
  Text,
  IconButton,
  Icon,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { FiHelpCircle } from 'react-icons/fi';

interface CardProps {
  children: React.ReactNode;
  title: string;
  onToggle: () => void;
  isOpen: boolean;
}

export const Card = ({ children, title, onToggle, isOpen }: CardProps) => {
  return (
    <Box
      rounded='lg'
      bg={useColorModeValue('white', 'gray.700')}
      border='1px solid gray'
      p={2}
    >
      <Grid>
        <GridItem
          display='flex'
          alignItems='center'
          justifyContent='space-between'
        >
          <Icon as={FiHelpCircle} />
          <Text fontWeight='bold'>{title}</Text>
          <IconButton
            bg='none'
            onClick={onToggle}
            border='1px solid black'
            padding='0.25rem'
            size='56px'
            aria-label='collapse/expand'
            icon={isOpen ? <BiChevronUp /> : <BiChevronDown />}
          />
        </GridItem>
        {children}
      </Grid>
    </Box>
  );
};
