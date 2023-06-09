import {
  Box,
  Collapse,
  useDisclosure,
  Text,
  Tag,
  TagLeftIcon,
  TagLabel,
} from '@chakra-ui/react';
import { Card } from '../Card';
import { BsExclamationLg } from 'react-icons/bs';
import { useMemo } from 'react';
import { useSelectedLocations } from '../../hooks/useSelectedLocations';

export const BottomBar = () => {
  const { onToggle, isOpen } = useDisclosure();
  const { locations, removeLocation } = useSelectedLocations();

  const emptyBottomBar = useMemo(
    () => (
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
          You can do this by clicking the <b>desired location on the map</b> or
          by using the <b>search bar</b> at the top of the page.
        </Text>
      </Box>
    ),
    []
  );

  const locationDetails = (
    <Box>
      {' '}
      {locations.map((locationId) => (
        <span>{locationId}</span>
      ))}{' '}
    </Box>
  );

  return (
    <Box position='fixed' right={0} bottom='0' padding={2} display='flex'>
      <Box
        width={locations.length ? '80vw' : '30vw'}
        transition='bottom 1.2s ease-out'
        transform={isOpen ? 'none' : 'translateY(100%'}
        backgroundColor='white'
        borderRadius='md'
        boxShadow='md'
        overflow='hidden'
      >
        <Card title='Location Details' onToggle={onToggle} isOpen={!isOpen}>
          <Collapse in={isOpen} startingHeight={0} animateOpacity>
            {locations.length ? locationDetails : emptyBottomBar}
          </Collapse>
        </Card>
      </Box>
    </Box>
  );
};
