import React, { useEffect, useState } from 'react';
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
  Avatar,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';
import { LngLatLike, useMap } from 'react-map-gl';

interface SearchBarProps extends BoxProps {
  value: string;
  isLoading: boolean;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resultListMaxHeight?: string;
  searchResults?: any[];
  placeholder?: string;
  input?: { iconPosition: 'left' | 'right' };
  noResultFoundText?: string;
}

export const SearchBar = (props: SearchBarProps) => {
  const {
    value,
    isLoading,
    input,
    onSearchChange,
    resultListMaxHeight = '60vh',
    placeholder = 'Search a location',
    searchResults = [],
    noResultFoundText = 'No location found for that name. Try again!',
    ...rest
  } = props;

  const { iconPosition = 'left' } = input || {};
  const [showResults, setShowResults] = useState(false);
  const { map } = useMap();

  const onBlur = () => setTimeout(() => setShowResults(false), 200);
  const onResultSelect = (location: {
    geometry: { coordinates: LngLatLike };
  }) => {
    map?.easeTo({
      center: location.geometry.coordinates,
      zoom: 18,
      duration: 500,
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
      <InputGroup width='30rem'>
        {iconPosition === 'left' && (
          <InputLeftElement
            pointerEvents='none'
            children={
              isLoading ? <Spinner size='sm' /> : <Icon as={FaSearch} />
            }
          />
        )}
        <Input
          rounded='lg'
          h='44px'
          bgColor='white'
          border='1px solid gray'
          placeholder={placeholder}
          value={value}
          onChange={onSearchChange}
          onFocus={() => setShowResults(true)}
          onBlur={onBlur}
        />
        {iconPosition === 'right' && (
          <InputRightElement
            pointerEvents='none'
            children={
              isLoading ? <Spinner size='sm' /> : <Icon as={FaSearch} />
            }
          />
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
          {searchResults?.length! > 0
            ? searchResults?.map((result) => (
                <Box
                  key={result.id}
                  borderBottom='1px solid rgba(34,36,38,.1)'
                  cursor='pointer'
                  _hover={{ bgColor: '#f9fafb' }}
                  onClick={() => onResultSelect(result)}
                >
                  <Flex p='1rem' margin='0' alignItems='center'>
                    <Avatar
                      size='sm'
                      icon={<HiLocationMarker />}
                      marginRight={2}
                    />
                    <Box>
                      <Text>
                        <b>{result.properties.name}</b>, Portugal
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              ))
            : !isLoading &&
              value !== '' && (
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
