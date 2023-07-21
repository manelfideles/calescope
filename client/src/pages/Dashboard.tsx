import { useForm } from 'react-hook-form';
import { debounce } from 'lodash';
import { useLocalStorage } from 'usehooks-ts';
import { Sidebar } from '../components/Sidebar';
import { MapBox } from '../components/MapBox';
import { BottomBar } from '../components/BottomBar';
import { SearchBar } from '../components/SearchBar';
import { Form } from '../components/Forms/Form';
import { SelectedLocationsContextProvider } from '../hooks/useSelectedLocations';
import { SliderValuesType, User } from '../utils/types';
import { useMemo } from 'react';

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

export const Dashboard = () => {
  const [
    {
      userSettings: { variables },
    },
    _setSettings,
  ] = useLocalStorage<User>('settings', defaultUserValues);

  const defaultValues = useMemo(
    () =>
      variables
        .filter(({ isSelected }) => isSelected)
        .map(({ name, id }) => ({ name: name.toLocaleLowerCase(), id }))
        .concat([
          { name: 'altitude', id: -1 },
          { name: 'time', id: -2 },
        ])
        .reduce(
          (prevVal, curVal) => ({
            ...prevVal,
            [curVal.name]: {
              id: curVal.id,
              mode: 'value' as const,
              val:
                curVal.name == 'time'
                  ? new Date().toISOString().slice(0, 16)
                  : 0,
            },
          }),
          {}
        ),
    [variables]
  );

  const form = useForm<Record<string, SliderValuesType>>({ defaultValues });
  const onSubmit = () => console.log(form.getValues());
  const debouncedOnSubmit = debounce(onSubmit, 500);

  return (
    <SelectedLocationsContextProvider>
      <Form form={form} onSubmit={debouncedOnSubmit} isReactive>
        <Sidebar />
        <SearchBar />
        <MapBox />
        <BottomBar />
      </Form>
    </SelectedLocationsContextProvider>
  );
};
