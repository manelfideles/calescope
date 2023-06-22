import { Sidebar } from '../components/Sidebar';
import { MapBox } from '../components/MapBox';
import { BottomBar } from '../components/BottomBar';
import { SearchBar } from '../components/SearchBar';
import { SelectedLocationsContextProvider } from '../hooks/useSelectedLocations';

export const Dashboard = () => {
  return (
    <SelectedLocationsContextProvider>
      <Sidebar />
      <SearchBar />
      <MapBox />
      <BottomBar />
    </SelectedLocationsContextProvider>
  );
};
