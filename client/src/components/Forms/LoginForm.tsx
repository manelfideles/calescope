import {
  Box,
  Input,
  Stack,
  Button,
  useColorModeValue,
  InputGroup,
  IconButton,
  InputRightElement,
} from '@chakra-ui/react';
import { Form } from './Form';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { FormInput } from './FormInput';
import { BiHide, BiShow } from 'react-icons/bi';
import { SignInInputs } from '../../utils/types';

export const LoginForm = () => {
  const form = useForm<SignInInputs>();
  const [showPassword, setShowPassword] = useState(false);
  const {
    signIn,
    isLoading,
    authState: { isLoggedIn },
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, [isLoggedIn]);

  const onSubmit = (userData: any) => signIn(userData);

  return (
    <Form<SignInInputs> form={form} onSubmit={onSubmit}>
      <Box
        rounded='lg'
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow='lg'
        p={8}
      >
        <Stack spacing={4}>
          <FormInput
            label='Email'
            name='email'
            fieldError={form.formState.errors.email}
            isRequired
          >
            <Input
              type='email'
              id='email'
              {...form.register('email', { required: 'This is required' })}
            />
          </FormInput>
          <FormInput
            label='Password'
            name='password'
            fieldError={form.formState.errors.password}
            isRequired
          >
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                id='password'
                {...form.register('password', { required: 'This is required' })}
              />
              <InputRightElement h='full'>
                <IconButton
                  aria-label='show/hide password'
                  variant='ghost'
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                  icon={showPassword ? <BiHide /> : <BiShow />}
                />
              </InputRightElement>
            </InputGroup>
          </FormInput>
          <Stack spacing={10}>
            <Button
              colorScheme='teal'
              type='submit'
              loadingText='Signing in...'
              isLoading={isLoading}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Form>
  );
};
