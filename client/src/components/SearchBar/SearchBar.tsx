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
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

interface Props extends BoxProps {
  value: string;
  isLoading: boolean;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resultRenderer: (result: any) => JSX.Element;
  onResultSelect: (result: any) => void;
  resultListMaxHeight?: string;
  searchResults?: any[];
  placeholder?: string;
  input?: { iconPosition: 'left' | 'right' };
  noResultFoundText?: string;
}

export const SearchBar = (props: Props) => {
  const {
    value,
    isLoading,
    input,
    onSearchChange,
    resultRenderer,
    onResultSelect,
    resultListMaxHeight = '60vh',
    placeholder = '',
    searchResults = [],
    noResultFoundText = 'No results found.',
    ...rest
  } = props;

  const { iconPosition = 'left' } = input || {};

  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    searchResults?.map((result: any) => ({
      name: result.properties.name,
      id: result.properties.id,
      coordinates: result.geometry.coordinates,
    }));
  }, [searchResults]);

  const onBlur = () => {
    setTimeout(() => {
      setShowResults(false);
    }, 200);
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
          border='1px solid gray'
          marginTop={2}
          w='30rem'
          rounded='lg'
          sx={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {searchResults.length > 0
            ? searchResults.map((result) => (
                <Box
                  key={result.id || result._id || result.key}
                  borderBottom='1px solid rgba(34,36,38,.1)'
                  cursor='pointer'
                  _hover={{
                    bgColor: '#f9fafb',
                  }}
                  onClick={() => onResultSelect(result)}
                >
                  <Flex alignItems='center'>
                    <Box p='0.8em' margin='0' color='black'>
                      {resultRenderer(result)}
                    </Box>
                  </Flex>
                </Box>
              ))
            : !isLoading && (
                <Box borderBottom='1px solid rgba(34,36,38,.1)'>
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
