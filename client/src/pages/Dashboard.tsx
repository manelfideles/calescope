import { Sidebar } from '../components/Sidebar';
import { MapBox } from '../components/MapBox';
import { BottomBar } from '../components/BottomBar';
import { SearchBar } from '../components/SearchBar';
import { useState } from 'react';
import { useRPC } from '../hooks/useRPC';

export const Dashboard = () => {
  const [searchValue, setSearchValue] = useState('');
  const { data: searchData, isLoading: isLoadingSearch } = useRPC({
    rpcName: 'search_locations_by_string',
    params: { search_term: searchValue },
  });

  return (
    <>
      <SearchBar
        value={searchValue}
        isLoading={isLoadingSearch}
        onSearchChange={(e) => setSearchValue(e.target.value)}
        onResultSelect={(location) => console.log({ location })}
        searchResults={searchValue === '' ? [] : searchData?.features}
      />
      <Sidebar />
      <MapBox />
      <BottomBar />
    </>
  );
};
