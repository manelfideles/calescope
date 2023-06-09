import { Sidebar } from '../components/Sidebar';
import { MapBox } from '../components/MapBox';
import { BottomBar } from '../components/BottomBar';
import { SearchBar } from '../components/SearchBar';

export const Dashboard = () => {
  return (
    <>
      <MapBox />
      <SearchBar />
      <Sidebar />
      <BottomBar />
    </>
  );
};
