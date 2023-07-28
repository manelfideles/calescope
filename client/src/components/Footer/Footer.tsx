import { Flex, Link } from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';

export const Footer = ({ bgColor = 'gray.50' }: { bgColor?: string }) => {
  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      py={10}
      bg={bgColor}
      color={bgColor && 'white'}
    >
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
