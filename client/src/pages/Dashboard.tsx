import { Sidebar } from '../components/Sidebar';
import { MapBox } from '../components/MapBox';
import { BottomBar } from '../components/BottomBar';
import { SearchBar } from '../components/SearchBar';
import { SelectedLocationsContextProvider } from '../hooks/useSelectedLocations';
import { SliderValuesType, User } from '../utils/types';
import { useForm } from 'react-hook-form';
import { debounce } from 'lodash';
import { Form } from '../components/Forms/Form';

export const Dashboard = () => {
  const {
    userSettings: { variables },
  }: User = JSON.parse(localStorage.getItem('settings') ?? '') ?? [];
  const defaultValues = variables
    .filter(({ isSelected }) => isSelected as boolean)
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
            curVal.name == 'time' ? new Date().toISOString().slice(0, 16) : 0,
        },
      }),
      {}
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
