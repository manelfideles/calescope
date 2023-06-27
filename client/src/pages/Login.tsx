import { Flex, Stack, Link, Heading, Text } from '@chakra-ui/react';
import { LoginForm } from '../components/Forms/LoginForm';

export const Login = () => {
  return (
    <Flex align='center' justifyContent='center' bg='white' minH={'90%'}>
      <Stack spacing={5} maxW='lg'>
        <Heading fontSize='3xl'>Sign in to your account</Heading>
        <LoginForm />
        <Text align='center'>
          Don't have an account yet?
          <Link href='/register' color='blue.400' marginLeft={1}>
            Register here.
          </Link>
        </Text>
      </Stack>
    </Flex>
  );
};
