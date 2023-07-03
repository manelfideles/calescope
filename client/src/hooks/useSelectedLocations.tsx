import { createContext, useContext, useState } from 'react';
import { SelectedLocation } from '../utils/types';
import { includes } from 'lodash';
import { useToast } from '@chakra-ui/react';
import { getRandomColor } from '../utils/mockData';

interface SelectedLocationsProviderProps {
  children: React.ReactNode;
}

interface SelectedLocationsContextInterface {
  locations: SelectedLocation[];
  addLocation: (locationName: string, locationId: number) => void;
  removeLocation: (locationName: string, locationId: number) => void;
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
  const toast = useToast();

  const isInSelectedLocations = (locationId: number) =>
    locations.some((l) => includes(l, locationId));

  const addLocation = (locationName: string, locationId: number) => {
    if (!isInSelectedLocations(locationId)) {
      const color = getRandomColor();
      setLocations([
        ...locations,
        { locationName, locationId, isVisible: true, color },
      ]);
      toast({
        status: 'info',
        title: `Added '${locationName}' to selected locations.`,
      });
    }
  };

  const removeLocation = (locationName: string, locationId: number) => {
    if (isInSelectedLocations(locationId)) {
      setLocations((prevLocations) =>
        prevLocations.filter(
          ({ locationId: id }: SelectedLocation) => id !== locationId
        )
      );
      toast({
        status: 'warning',
        title: `Removed '${locationName}' from selected locations.`,
      });
    }
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
