import { useState } from 'react';
import {
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Box,
  Icon,
  BoxProps,
  InputRightElement,
  Flex,
  Text,
  CloseButton,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { LngLatLike, useMap } from 'react-map-gl';
import { useRPC } from '../../hooks/useRPC';
import { mapboxConfig } from '../../utils/mapbox-config';
import { LocationTag } from '../LocationTag';
import { useSelectedLocations } from '../../hooks/useSelectedLocations';

interface SearchBarProps extends BoxProps {
  resultListMaxHeight?: string;
  placeholder?: string;
  noResultFoundText?: string;
}

export const SearchBar = (props: SearchBarProps) => {
  const {
    resultListMaxHeight = '60vh',
    placeholder = 'Search a location',
    noResultFoundText = 'No location found for that name. Try again!',
    ...rest
  } = props;
  const { centerPoint, defaultZoom } = mapboxConfig;
  const [showResults, setShowResults] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');
  const { map } = useMap();
  const { isInSelectedLocations } = useSelectedLocations();
  const { data: searchData, isLoading } = useRPC({
    rpcName: 'search_locations_by_string',
    params: { search_term: searchInputValue },
  });

  const onBlur = () => setTimeout(() => setShowResults(false), 200);
  const onResultSelect = (location: {
    properties: { name: string };
    geometry: { coordinates: LngLatLike };
  }) => {
    setSearchInputValue(location.properties.name);
    map?.flyTo({
      center: location.geometry.coordinates,
      zoom: 18,
      duration: 750,
    });
  };
  const onSearchReset = () => {
    setSearchInputValue('');
    map?.flyTo({
      center: [centerPoint[1], centerPoint[0]],
      zoom: defaultZoom,
      duration: 750,
    });
  };

  return (
    <Box
      position='absolute'
      w='100%'
      display='flex'
      flexDir='column'
      justifyContent='center'
      alignItems='center'
      marginTop={2}
      {...rest}
    >
      <InputGroup
        width='25rem'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <InputLeftElement
          pointerEvents='none'
          children={
            isLoading ? (
              <Spinner size='sm' marginTop='1' />
            ) : (
              <Icon as={FaSearch} marginTop='1' />
            )
          }
        />
        <Input
          rounded='lg'
          h='44px'
          bgColor='white'
          border='1px solid gray'
          placeholder={placeholder}
          value={searchInputValue}
          onChange={(e) => setSearchInputValue(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={onBlur}
        />
        {searchInputValue !== '' && (
          <InputRightElement>
            <CloseButton marginTop='1' onClick={onSearchReset} />
          </InputRightElement>
        )}
      </InputGroup>
      {showResults && (
        <Box
          bgColor='white'
          maxHeight={resultListMaxHeight}
          overflowY='auto'
          marginTop={2}
          w='30rem'
          rounded='lg'
        >
          {searchInputValue !== '' && searchData?.features.length! > 0
            ? searchData?.features.map((result: any) => (
                <Box
                  key={result.properties.id}
                  borderBottom='1px solid gainsboro'
                  cursor='pointer'
                  _hover={{ bgColor: '#f9fafb' }}
                  onClick={() => onResultSelect(result)}
                >
                  <LocationTag
                    isSelected={isInSelectedLocations(result.properties.id)}
                    name={result.properties.name}
                    country='Portugal'
                  />
                </Box>
              ))
            : !isLoading &&
              searchInputValue !== '' && (
                <Box>
                  <Flex alignItems='center'>
                    <Box p='0.8em' margin='0' color='black'>
                      <Text>{noResultFoundText}</Text>
                    </Box>
                  </Flex>
                </Box>
              )}
        </Box>
      )}
    </Box>
  );
};
