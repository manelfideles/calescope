import { Sidebar } from '../components/Sidebar';
import { MapBox } from '../components/MapBox';
import { BottomBar } from '../components/BottomBar';

export const Dashboard = () => {
  return (
    <>
      <Sidebar />
      <MapBox />
      <BottomBar />
    </>
  );
};
