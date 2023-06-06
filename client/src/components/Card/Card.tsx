import {
  Grid,
  GridItem,
  Tooltip,
  Text,
  IconButton,
  Icon,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { BiArrowToBottom, BiArrowToTop } from 'react-icons/bi';
import { FiHelpCircle } from 'react-icons/fi';

interface CardProps {
  children: React.ReactNode;
  title: string;
  hasTooltip?: boolean;
  tooltipText?: string;
  onToggle: () => void;
  isOpen: boolean;
}

export const Card = ({
  children,
  title,
  hasTooltip,
  tooltipText,
  onToggle,
  isOpen,
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
          {hasTooltip ? (
            <Tooltip label={tooltipText} placement='start'>
              <Icon as={FiHelpCircle} />
            </Tooltip>
          ) : null}
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
        </GridItem>
        {children}
      </Grid>
    </Box>
  );
};
