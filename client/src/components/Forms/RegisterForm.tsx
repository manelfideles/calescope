import {
  Box,
  Stack,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiHide, BiShow } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { SignUpInputs } from '../../utils/types';
import { Form } from './Form';
import { FormInput } from './FormInput';

export const RegisterForm = () => {
  const form = useForm<SignUpInputs>();
  const [showPassword, setShowPassword] = useState(false);
  const {
    signUp,
    isLoading,
    authState: { isLoggedIn },
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, [isLoggedIn]);

  const onSubmit = (userData: any) => signUp(userData);

  return (
    <Form<SignUpInputs> form={form} onSubmit={onSubmit}>
      <Box rounded='lg' bg='white' boxShadow='lg' p={8}>
        <Stack spacing={4}>
          <HStack>
            <FormInput
              label='First Name'
              name='firstName'
              fieldError={form.formState.errors.firstName}
              isRequired
            >
              <Input
                type='text'
                id='firstName'
                {...form.register('firstName', {
                  required: 'This is required',
                })}
              />
            </FormInput>
            <FormInput
              label='Last Name'
              name='lastName'
              fieldError={form.formState.errors.lastName}
              isRequired
            >
              <Input
                type='text'
                id='lastName'
                {...form.register('lastName', { required: 'This is required' })}
              />
            </FormInput>
          </HStack>
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
              <InputRightElement h={'full'}>
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
          <Button
            type='submit'
            isLoading={isLoading}
            loadingText='Submitting...'
            size='lg'
            colorScheme='teal'
          >
            Sign up
          </Button>
        </Stack>
      </Box>
    </Form>
  );
};
