import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';

export const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container as={Stack} py={4} spacing={4} justify='center' align='center'>
        <Text display={'flex'}>
          Made with ❤ by{' '}
          <Link
            display={'flex'}
            paddingLeft='0.25rem'
            href='https://www.github.com/manelfideles'
            color={'blue.400'}
            isExternal
          >
            Manuel Fideles <FiExternalLink size='12px' />
          </Link>
        </Text>
      </Container>
    </Box>
  );
};
