import {
  Box,
  Collapse,
  useDisclosure,
  Text,
  Tag,
  TagLeftIcon,
  TagLabel,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import { Card } from '../Card';
import { BsExclamationLg } from 'react-icons/bs';
import { BiTrash, BiHide, BiShow } from 'react-icons/bi';
import { useMemo } from 'react';
import { useSelectedLocations } from '../../hooks/useSelectedLocations';
import { D3AreaGraph } from '../d3-graphs/D3AreaGraph';
import { areaChartData } from '../../utils/mockData';

export const BottomBar = () => {
  const { onToggle, isOpen } = useDisclosure();
  const { locations, removeLocation, toggleLocationVisibility } =
    useSelectedLocations();

  const selectedLocationsList = useMemo(
    () => (
      <Flex w='20%' flexDir='column' gap={2} overflowY='auto'>
        {locations.map(({ locationId, locationName, isVisible }) => (
          <Flex justifyContent='space-between' alignItems='center'>
            <Tag fontWeight='normal' maxW='50%' p={1}>
              {locationName}
            </Tag>
            <Flex gap={1}>
              <IconButton
                onClick={() => toggleLocationVisibility(locationId)}
                size='xs'
                p={0}
                icon={isVisible ? <BiHide /> : <BiShow />}
                aria-label='hide-location'
              />
              <IconButton
                onClick={() => removeLocation(locationId)}
                colorScheme='red'
                size='xs'
                p={0}
                icon={<BiTrash />}
                aria-label=''
              />
            </Flex>
          </Flex>
        ))}
      </Flex>
    ),
    [locations]
  );

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
    <Flex maxH='15rem'>
      {selectedLocationsList}
      <Box>
        <D3AreaGraph width={300} height={250} data={areaChartData} />
      </Box>
    </Flex>
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
        <Card title='Location Details' onToggle={onToggle} isOpen={isOpen}>
          <Collapse
            in={locations.length ? !isOpen : isOpen}
            startingHeight={0}
            animateOpacity
          >
            {locations.length ? locationDetails : emptyBottomBar}
          </Collapse>
        </Card>
      </Box>
    </Box>
  );
};
