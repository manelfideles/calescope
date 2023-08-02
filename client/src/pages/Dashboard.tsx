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
import { useMemo, useState } from 'react';
import { getDefaultUserValues } from '../utils/mockData';

export const Dashboard = () => {
  const [selectedVariableId, setSelectedVariableId] = useState(1);
  const [
    {
      userSettings: { variables },
    },
    _setSettings,
  ] = useLocalStorage<User>('settings', getDefaultUserValues());

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
              mode: 'range' as const,
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
        <MapBox selectedVariableId={selectedVariableId} />
        <BottomBar
          selectedVariableId={selectedVariableId}
          setSelectedVariableId={setSelectedVariableId}
        />
      </Form>
    </SelectedLocationsContextProvider>
  );
};
