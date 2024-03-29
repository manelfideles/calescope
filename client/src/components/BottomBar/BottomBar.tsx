import {
  Box,
  Collapse,
  useDisclosure,
  Tag,
  TagLeftIcon,
  TagLabel,
  IconButton,
  Flex,
  Button,
  Select,
  Link,
  Text,
} from '@chakra-ui/react';
import { Card } from '../Card';
import { BsExclamationLg } from 'react-icons/bs';
import { BiTrash, BiHide, BiShow } from 'react-icons/bi';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { useSelectedLocations } from '../../hooks/useSelectedLocations';
import { useRPC } from '../../hooks/useRPC';
import '../../../node_modules/react-vis/dist/style.css';
import { LineChart } from '../d3-graphs/LineChart';
import { map, omit, startCase } from 'lodash';
import { User } from '../../utils/types';
import { useSidebarFormValues } from '../../hooks/useSidebarFormValues';
import { useLocalStorage } from 'usehooks-ts';
import { Link as ReactRouterLink } from 'react-router-dom';
import { getDefaultUserValues } from '../../utils/mockData';

const formatInsertedDate = (date: string) =>
  !date.length ? '' : date.replace('T', ' ').slice(0, 16) + ':00+00';

interface BottomBarProps {
  selectedVariableId: number;
  setSelectedVariableId: Dispatch<SetStateAction<number>>;
}

export const BottomBar = ({
  selectedVariableId,
  setSelectedVariableId,
}: BottomBarProps) => {
  const { onToggle, isOpen } = useDisclosure();
  const [
    {
      userSettings: { variables },
    },
    _setSettings,
  ] = useLocalStorage<User>('settings', getDefaultUserValues());
  const { locations, removeLocation, toggleLocationVisibility } =
    useSelectedLocations();
  const { altitude, time, ...dynamicVariables } = useSidebarFormValues();
  const {
    data: areaChartData,
    error,
    isLoading: isLoadingChartData,
  } = useRPC({
    rpcName: 'get_filtered_values',
    convertToJson: false,
    params: {
      min_altitude:
        altitude.mode === 'value' ? altitude.val : altitude.val[0] || 0,
      max_altitude:
        altitude.mode === 'value' ? altitude.val + 1 : altitude.val[1] || 1,
      min_timestamp: formatInsertedDate(time.val[0]),
      max_timestamp:
        time.mode === 'value'
          ? formatInsertedDate(time.val[0])
          : formatInsertedDate(time.val[1]),
      variable_ranges: Object.values(dynamicVariables).map((variable) => ({
        variable_id: variable.id,
        min_value:
          variable.mode === 'value' ? variable.val : variable.val[0] || 0,
        max_value:
          variable.mode === 'value' ? variable.val + 1 : variable.val[1] || 1,
      })),
      selected_location_ids: map(locations, 'locationId'),
    },
  });

  const selectedLocationsList = useMemo(
    () => (
      <Flex flexDir='column' gap={2} overflowY='scroll' pr={2}>
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

  const variableSelectOptions = useMemo(
    () =>
      variables
        .filter(({ isSelected }) => isSelected)
        .map(({ id, name }) => ({
          value: id,
          text: startCase(name),
        })),
    [variables]
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
          <TagLeftIcon boxSize='1rem' as={BsExclamationLg} />
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

  const noDataToDisplayDiv = useMemo(
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
          <TagLeftIcon boxSize='1rem' as={BsExclamationLg} />
          <TagLabel textAlign='center'>No data to display</TagLabel>
        </Tag>
        <Text textAlign='center' padding={2} maxWidth='20rem'>
          This location has no available data for the chosen variable in the{' '}
          <b>selected range</b>.<br />
          Select different altitude, time, or{' '}
          <b>
            {variables.filter(({ id }) => id === selectedVariableId)[0].name}
          </b>{' '}
          ranges/values to display here. <br />
          You can also upload data for this location and variable in the{' '}
          <b>
            <u>
              <Link as={ReactRouterLink} to='/settings'>
                Settings
              </Link>
            </u>
          </b>{' '}
          page.
        </Text>
      </Box>
    ),
    []
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
            {!locations.length ? (
              emptyBottomBar
            ) : (
              <Flex pt={3}>
                {selectedLocationsList}
                <Box pt={5} borderLeft='1px solid gray' pl={1}>
                  <Select
                    ml={10}
                    w='375px'
                    placeholder='Select a variable'
                    defaultValue={1}
                    onChange={({ currentTarget: { value } }) =>
                      setSelectedVariableId(Number(value))
                    }
                  >
                    {variableSelectOptions.map(({ value, text }) => (
                      <option value={value}>{text}</option>
                    ))}
                  </Select>
                  {areaChartData && areaChartData.length > 0 ? (
                    <LineChart
                      selectedVariableId={selectedVariableId}
                      data={areaChartData}
                      seriesColor={map(locations, (elem) =>
                        omit(elem, ['locationName'])
                      )}
                    />
                  ) : (
                    noDataToDisplayDiv
                  )}
                </Box>
              </Flex>
            )}
          </Collapse>
        </Card>
      </Box>
    </Box>
  );
};
