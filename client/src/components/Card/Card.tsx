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

interface CardProps {
  children: React.ReactNode;
  title: string;
  onToggle: () => void;
  isOpen: boolean;
  variableColor?: string;
}

export const Card = ({
  children,
  title,
  onToggle,
  isOpen,
  variableColor,
}: CardProps) => {
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
          <Box ml='3px' p={2} rounded='lg' bgColor={variableColor} />
          <Text fontWeight='bold'>{title}</Text>
          <IconButton
            bg='none'
            onClick={onToggle}
            border='1px solid gray'
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
