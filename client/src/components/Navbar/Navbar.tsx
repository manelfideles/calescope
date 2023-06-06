import {
  Box,
  Flex,
  Button,
  Avatar,
  Stack,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { routes } from '../../routes/routes';
import { dropRight } from 'lodash';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('black', 'white');
  const { authState, signOut } = useAuth();
  const navigate = useNavigate();

  const userDisplayName = authState?.isLoggedIn
    ? authState.user?.user_metadata.firstName +
      ' ' +
      authState.user?.user_metadata.lastName
    : undefined;

  const navItems = dropRight(routes, 2)
    .filter(({ showIfLoggedOut }) => showIfLoggedOut !== authState.isLoggedIn)
    .map(({ pageName, path }) => (
      <Link
        fontSize={'sm'}
        fontWeight={500}
        color={linkColor}
        _hover={{ textDecoration: 'none', color: linkHoverColor }}
      >
        <RouterLink to={path}>{pageName}</RouterLink>
      </Link>
    ));

  return (
    <Box marginBottom={5}>
      <Flex minH='60px' py={{ base: 2 }} px={{ base: 4 }} align='center'>
        <Flex flex={{ base: 1 }} justify='flex-start'>
          <Flex>
            <Stack direction={'row'} spacing={4}>
              {navItems}
            </Stack>
          </Flex>
        </Flex>

        {authState?.isLoggedIn ? (
          <Stack justify='center' align='center' direction='row' spacing={7}>
            <Box display='flex' alignItems='center' gap={2}>
              <Text fontWeight='500'>{userDisplayName}</Text>
              <Avatar name={userDisplayName} src='' size='sm' />
            </Box>
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize='sm'
              fontWeight={600}
              colorScheme='red'
              onClick={() => {
                signOut();
                navigate('/');
              }}
            >
              Logout
            </Button>
          </Stack>
        ) : (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify='flex-end'
            direction='row'
            spacing={6}
          >
            <Button
              as='a'
              fontSize='sm'
              fontWeight={400}
              variant='link'
              href='/login'
            >
              Sign In
            </Button>
            <Button
              as='a'
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize='sm'
              fontWeight={600}
              color='white'
              bg='pink.400'
              href='/register'
              _hover={{ bg: 'pink.600' }}
            >
              Sign Up
            </Button>
          </Stack>
        )}
      </Flex>
    </Box>
  );
};
