import { Flex, Link } from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';

export const Footer = () => {
  return (
    <Flex alignItems='center' justifyContent='center' py={10} bg='gray.50'>
      Made with ❤ by{' '}
      <Link
        display='flex'
        paddingLeft='0.25rem'
        href='https://www.github.com/manelfideles'
        color='blue.400'
        isExternal
      >
        Manuel Fideles <FiExternalLink size='12px' />
      </Link>
    </Flex>
  );
};
