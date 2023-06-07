import {
  Box,
  Collapse,
  useDisclosure,
  Text,
  Button,
  Tag,
  TagLeftIcon,
  TagLabel,
  Grid,
  GridItem,
  Divider,
} from '@chakra-ui/react';
import { Card } from '../Card';
import { MdOutlineAutoGraph } from 'react-icons/md';
import { BsExclamationLg } from 'react-icons/bs';
import { useState } from 'react';

export const BottomBar = () => {
  const { onToggle, isOpen } = useDisclosure();
  const [selectedLocation, setSelectedLocation] = useState(-1);

  const emptyBottomBar = (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDir='column'
      gap={2}
      padding={10}
    >
      <Tag colorScheme='red' padding={2}>
        <TagLeftIcon boxSize='12px' as={BsExclamationLg} />
        <TagLabel textAlign='center'>No location selected</TagLabel>
      </Tag>
      <Text textAlign='center' padding={2} maxWidth='20rem'>
        Select a location to see details. <br />
        You can do this by clicking the <b>desired location on the map</b> or by
        using the <b>search bar</b> at the top of the page.
      </Text>
    </Box>
  );

  return (
    <Box position='fixed' right={0} bottom='0' padding={2} display='flex'>
      <Box
        width={selectedLocation > -1 ? '80vw' : '30vw'}
        transition='bottom 1.2s ease-out'
        transform={isOpen ? 'none' : 'translateY(100%'}
        backgroundColor='white'
        borderRadius='md'
        boxShadow='md'
        overflow='hidden'
      >
        <Card title='Location Details' onToggle={onToggle} isOpen={!isOpen}>
          <Collapse in={isOpen} startingHeight={0} animateOpacity>
            {emptyBottomBar}
          </Collapse>
        </Card>
      </Box>
    </Box>
  );
};
