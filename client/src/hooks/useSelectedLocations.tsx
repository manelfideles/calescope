import { createContext, useContext, useState } from 'react';
import { SelectedLocation } from '../utils/types';
import { findIndex, includes, update } from 'lodash';

interface SelectedLocationsProviderProps {
  children: React.ReactNode;
}

interface SelectedLocationsContextInterface {
  locations: SelectedLocation[];
  addLocation: (locationId: number) => void;
  removeLocation: (locationId: number) => void;
  toggleLocationVisibility: (locationId: number) => void;
}

const initialState = {
  locations: [],
  addLocation: () => null,
  removeLocation: () => null,
  toggleLocationVisibility: () => null,
};

export const SelectedLocationsContext =
  createContext<SelectedLocationsContextInterface>(initialState);

export const useSelectedLocations = () => {
  const context = useContext(SelectedLocationsContext);
  if (!context)
    throw Error(
      'useSelectedLocations must be used within SelectedLocationsProvider'
    );
  return context;
};

export const SelectedLocationsContextProvider = ({
  children,
}: SelectedLocationsProviderProps) => {
  const [locations, setLocations] = useState<SelectedLocation[]>([]);

  const isInSelectedLocations = (locationId: number) =>
    locations.some((l) => includes(l, locationId));

  const addLocation = (locationId: number) => {
    if (!isInSelectedLocations(locationId))
      setLocations([...locations, { locationId, isVisible: true }]);
  };

  const removeLocation = (locationId: number) => {
    if (isInSelectedLocations(locationId))
      setLocations((prevLocations) =>
        prevLocations.filter(
          ({ locationId: id }: SelectedLocation) => id !== locationId
        )
      );
  };

  const toggleLocationVisibility = (locationId: number) => {
    setLocations((prevLocations) =>
      prevLocations.map((l) =>
        l.locationId === locationId ? { ...l, isVisible: !l.isVisible } : l
      )
    );
  };

  return (
    <SelectedLocationsContext.Provider
      value={{
        locations,
        addLocation,
        removeLocation,
        toggleLocationVisibility,
      }}
    >
      {children}
    </SelectedLocationsContext.Provider>
  );
};
