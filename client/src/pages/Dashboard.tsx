import { Sidebar } from '../components/Sidebar';
import { MapBox } from '../components/MapBox';
import { BottomBar } from '../components/BottomBar';
import { SearchBar } from '../components/SearchBar';
import { useEffect, useState } from 'react';
import { useRPC } from '../hooks/useRPC';

export const Dashboard = () => {
  const [searchValue, setSearchValue] = useState('');
  const {
    data: searchData,
    error: searchError,
    isLoading: isLoadingSearch,
  } = useRPC({
    rpcName: 'search_locations_by_string',
    params: { search_term: searchValue },
  });

  return (
    <>
      <SearchBar
        isLoading={isLoadingSearch}
        value={searchValue}
        searchResults={searchData ? searchData.features : []}
        placeholder='Search a location'
        onSearchChange={(e) => setSearchValue(e.target.value)}
        resultRenderer={(location) => <>{location}</>}
        onResultSelect={(location) => console.log({ location })}
        noResultFoundText='No location found for that name. Try again!'
      />
      <Sidebar />
      <MapBox />
      <BottomBar />
    </>
  );
};
