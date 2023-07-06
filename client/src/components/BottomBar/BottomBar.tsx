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
  Button,
  Select,
} from '@chakra-ui/react';
import { Card } from '../Card';
import { BsExclamationLg } from 'react-icons/bs';
import { BiTrash, BiHide, BiShow } from 'react-icons/bi';
import { useMemo } from 'react';
import { useSelectedLocations } from '../../hooks/useSelectedLocations';
import { useRPC } from '../../hooks/useRPC';
import '../../../node_modules/react-vis/dist/style.css';
import { AreaChart } from '../d3-graphs/AreaChart';
import { map, omit, startCase, uniqBy } from 'lodash';

export const BottomBar = () => {
  const { onToggle, isOpen } = useDisclosure();
  const { locations, removeLocation, toggleLocationVisibility } =
    useSelectedLocations();
  const {
    data: areaChartData,
    error,
    isLoading: isLoadingChartData,
  } = useRPC({
    rpcName: 'get_filtered_values',
    convertToJson: false,
    // TODO: These values will be controlled by the sidebar context
    params: {
      min_altitude: 0,
      max_altitude: 100,
      min_val: 0,
      max_val: 18,
      selected_location_ids: map(locations, 'locationId'),
    },
  });

  const selectedLocationsList = useMemo(
    () => (
      <Flex flexDir='column' gap={2} overflowY='auto' pr={2}>
        <Text fontWeight='600' fontSize='sm'>
          {locations.length} Selected Location(s)
        </Text>
        {locations.map(({ locationId, locationName, isVisible, color }) => (
          <Flex justifyContent='space-between' alignItems='center' gap={5}>
            <Button
              fontWeight='normal'
              fontSize='sm'
              isDisabled={!isVisible}
              p={2}
            >
              <Flex flexDir='row' align='center' gap={1}>
                <Box p={2} rounded='lg' bgColor={color} opacity={0.45} />
                {locationName}
              </Flex>
            </Button>
            <Flex gap={1}>
              <IconButton
                onClick={() => toggleLocationVisibility(locationId)}
                icon={isVisible ? <BiHide /> : <BiShow />}
                aria-label='hide-location'
              />
              <IconButton
                onClick={() => removeLocation(locationName, locationId)}
                colorScheme='red'
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

  const locationDetails = useMemo(
    () => (
      <Flex>
        <Box>{selectedLocationsList}</Box>
        <Box pt={5} borderLeft='1px solid gray'>
          <Select ml={10} w='375px'>
            {uniqBy(areaChartData, 'measuredVariableId').map(
              ({ measured_variable_id, variable_name }: any) => (
                <option value={measured_variable_id}>
                  {startCase(variable_name)}
                </option>
              )
            )}
          </Select>
          <AreaChart
            data={areaChartData}
            seriesColor={map(locations, (elem) => omit(elem, ['locationName']))}
          />
        </Box>
      </Flex>
    ),
    [isLoadingChartData, selectedLocationsList]
  );

  return (
    <Box position='fixed' right={0} bottom='0' padding={2} display='flex'>
      <Box
        width={locations.length ? 'fit-content' : '30vw'}
        minWidth='30rem'
        transition='bottom 1.2s ease-out'
        transform={isOpen ? 'none' : 'translateY(100%'}
        backgroundColor='white'
        borderRadius='md'
        boxShadow='md'
        overflow='hidden'
      >
        <Card title='Location Details' onToggle={onToggle} isOpen={!isOpen}>
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
