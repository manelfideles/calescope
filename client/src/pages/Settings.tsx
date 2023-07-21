import {
  useDisclosure,
  Heading,
  Stack,
  Box,
  Button,
  Grid,
  GridItem,
  Select,
  HStack,
  Input,
  Text,
  Flex,
  Link,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEdit, FiSave, FiPlus, FiXCircle } from 'react-icons/fi';
import { Form } from '../components/Forms/Form';
import { FormInput } from '../components/Forms/FormInput';
import { useAuth } from '../hooks/useAuth';
import { User } from '../utils/types';
import { Link as RouterLink } from 'react-router-dom';
import { useClient } from 'react-supabase';
import { toLower, startCase } from 'lodash';
import { UploadForm } from '../components/Forms/UploadForm';
import { useLocalStorage } from 'usehooks-ts';

const defaultUserValues: User = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  userSettings: {
    variables: [],
    unitSystem: 'metric',
  },
};

export const Settings = () => {
  const {
    authState: { user },
    updateUser,
  } = useAuth();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const supabase = useClient();
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useLocalStorage<User>(
    'settings',
    defaultUserValues
  );
  const form = useForm<Omit<User, 'email' & 'password'>>({
    defaultValues: settings,
  });

  const onSave = async () => {
    setIsLoading(true);
    const { firstName, lastName, userSettings } = form.getValues();
    const inputSettings = {
      firstName,
      lastName,
      userSettings: {
        ...userSettings,
        variables: settings.userSettings.variables,
      },
    };
    updateUser({
      firstName: inputSettings.firstName,
      lastName: inputSettings.lastName,
    });
    localStorage.setItem('settings', JSON.stringify(inputSettings));
    setIsLoading(false);
  };

  const handleVariableButtonClick = (variableId: number) => {
    const idx = settings.userSettings.variables.findIndex(
      (v: { id: number }) => v.id === variableId
    );
    let clickedVariable = settings.userSettings.variables[idx];
    clickedVariable = {
      ...clickedVariable!,
      isSelected: !clickedVariable?.isSelected,
    };
    settings.userSettings.variables[idx] = clickedVariable;
    setSettings({ ...settings });
  };

  const fetchVariables = async () => {
    let { data: variables, error } = await supabase
      .from('test__variables')
      .select('*');
    if (error) toast({ status: 'error', title: error.message });
    else {
      const vars = variables!.map((variable) => ({
        id: variable.id,
        name: formatVariableName(variable.name),
        isSelected: false,
      }));
      setSettings({
        ...settings,
        userSettings: {
          unitSystem: settings.userSettings.unitSystem,
          variables: vars,
        },
      });
    }
  };

  const formatVariableName = (varName: string) => startCase(toLower(varName));

  useEffect(() => {
    if (settings.userSettings.variables.length === 0) {
      setIsLoading(true);
      fetchVariables();
      setIsLoading(false);
    }
  }, []);

  const buttonGroup = settings.userSettings.variables.map((v) => (
    <Button
      key={v.id}
      value={v.name}
      isDisabled={!isEditing}
      onClick={() => handleVariableButtonClick(v.id)}
      colorScheme={v.isSelected ? 'teal' : undefined}
      variant='solid'
      fontSize='sm'
      type='button'
      fontWeight='normal'
    >
      {v.name}
    </Button>
  ));

  return (
    <Grid marginX={4}>
      <Form<User> form={form} onSubmit={onSave}>
        <GridItem
          display='flex'
          alignItems='center'
          marginBottom={4}
          width='fit-content'
          gap={4}
        >
          <Heading fontSize='xl'>Settings</Heading>
          <Button
            rightIcon={isEditing ? <FiSave /> : <FiEdit />}
            size='xs'
            type='submit'
            isLoading={isLoading}
            loadingText='Saving...'
            colorScheme={isEditing ? 'green' : undefined}
            onClick={() => setIsEditing((isEditing) => !isEditing)}
          >
            {isEditing ? 'Save' : 'Edit'}
          </Button>
          {isEditing ? (
            <Button
              rightIcon={<FiXCircle />}
              size='xs'
              type='reset'
              colorScheme='red'
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          ) : undefined}
        </GridItem>
        <GridItem>
          <Grid templateColumns='repeat(2, 1fr)' gap={50}>
            <GridItem>
              <Stack fontSize='sm' fontWeight='bold'>
                <Box>
                  <Text as='u'>Account Display Name</Text>
                  <HStack marginY={2}>
                    <FormInput
                      label='First Name'
                      name='firstName'
                      fieldError={form.formState.errors.firstName}
                      isRequired
                    >
                      <Input
                        type='text'
                        id='firstName'
                        size='sm'
                        fontSize='sm'
                        isDisabled={!isEditing}
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
                        size='sm'
                        fontSize='sm'
                        defaultValue={user?.user_metadata.lastName}
                        isDisabled={!isEditing}
                        {...form.register('lastName', {
                          required: 'This is required',
                        })}
                      />
                    </FormInput>
                  </HStack>
                </Box>
                <Box>
                  <Text as='u'>Unit System</Text>
                  <FormInput
                    name='userSettings.unitSystem'
                    label=''
                    fieldError={form.formState.errors.userSettings?.unitSystem}
                  >
                    <Select
                      size='sm'
                      width='50%'
                      isDisabled={!isEditing}
                      marginY={2}
                      {...form.register('userSettings.unitSystem')}
                    >
                      <option value='metric'>Metric</option>
                      <option value='imperial'>Imperial</option>
                    </Select>
                  </FormInput>
                </Box>
              </Stack>
            </GridItem>
            <GridItem>
              <Stack width='80%' fontSize='sm' fontWeight='bold'>
                <Text as='u' marginTop={0.5}>
                  Variable Preferences
                </Text>
                <Box marginY={4}>
                  <Text fontWeight='normal'>
                    Here are listed all the variables that are available for
                    display on the dashboard. Click on them to toggle their
                    visibility on the dashboard.
                  </Text>
                  <Link
                    fontSize='sm'
                    fontWeight='normal'
                    color='blue.400'
                    marginY={4}
                  >
                    <RouterLink to='/faqs'>
                      Check out the file upload guidelines on the FAQs.
                    </RouterLink>
                  </Link>
                  <Flex gap={2} flexWrap='wrap' marginY={2}>
                    {buttonGroup}
                  </Flex>
                  <Button
                    onClick={onOpen}
                    variant='solid'
                    colorScheme='teal'
                    isDisabled={!isEditing}
                    size='sm'
                    leftIcon={<FiPlus />}
                    marginBottom={2}
                  >
                    Add Data
                  </Button>
                  <UploadForm isOpen={isOpen} onClose={onClose} />
                </Box>
              </Stack>
            </GridItem>
          </Grid>
        </GridItem>
      </Form>
    </Grid>
  );
};
