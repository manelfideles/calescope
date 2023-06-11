import { createContext, useContext, useState } from 'react';
import { SelectedLocation } from '../utils/types';
import { includes } from 'lodash';

interface SelectedLocationsProviderProps {
  children: React.ReactNode;
}

interface SelectedLocationsContextInterface {
  locations: SelectedLocation[];
  addLocation: (locationName: string, locationId: number) => void;
  removeLocation: (locationId: number) => void;
  toggleLocationVisibility: (locationId: number) => void;
  isInSelectedLocations: (locationId: number) => boolean;
}

const initialState = {
  locations: [],
  addLocation: () => null,
  removeLocation: () => null,
  toggleLocationVisibility: () => null,
  isInSelectedLocations: () => false,
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

  const addLocation = (locationName: string, locationId: number) => {
    if (!isInSelectedLocations(locationId))
      setLocations([
        ...locations,
        { locationName, locationId, isVisible: true },
      ]);
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
        isInSelectedLocations,
      }}
    >
      {children}
    </SelectedLocationsContext.Provider>
  );
};
