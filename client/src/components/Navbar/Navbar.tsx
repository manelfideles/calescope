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
import { useEffect } from 'react';

export const Navbar = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('black', 'white');
  const {
    authState: { isLoggedIn, user },
    signOut,
  } = useAuth();
  const navigate = useNavigate();

  const userDisplayName = isLoggedIn
    ? user?.user_metadata.firstName + ' ' + user?.user_metadata.lastName
    : undefined;

  useEffect(() => {
    if (!isLoggedIn) navigate('/login');
  }, [isLoggedIn]);

  const navItems = dropRight(routes, 2)
    .filter(({ showIfLoggedOut }) => showIfLoggedOut !== isLoggedIn)
    .map(({ pageName, path }, index) => (
      <Link
        fontSize='sm'
        key={index}
        color={linkColor}
        _hover={{ textDecoration: 'none', color: linkHoverColor }}
      >
        <RouterLink to={path}>{pageName}</RouterLink>
      </Link>
    ));

  return (
    <Box marginBottom={5}>
      <Flex minH='60px' py={{ base: 2 }} px={{ base: 4 }} align='center'>
        <Flex flex={{ base: 1 }} justify='flex-start' gap={5}>
          {navItems}
        </Flex>
        {isLoggedIn ? (
          <Flex gap={7}>
            <Flex alignItems='center' gap={2}>
              <Text fontWeight='500'>{userDisplayName}</Text>
              <Avatar name={userDisplayName} src='' size='sm' />
            </Flex>
            <Button
              fontSize='sm'
              fontWeight={600}
              colorScheme='red'
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </Flex>
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
              href='/register'
              colorScheme='teal'
            >
              Sign Up
            </Button>
          </Stack>
        )}
      </Flex>
    </Box>
  );
};
