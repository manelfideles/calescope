import { createContext, useContext, useState } from 'react';

interface SelectedLocationsProviderProps {
  children: React.ReactNode;
}

interface SelectedLocationsContextInterface {
  locations: number[];
  addLocation: (locationId: number) => void;
  removeLocation: (locationId: number) => void;
}

const initialState = {
  locations: [],
  addLocation: () => null,
  removeLocation: () => null,
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
  const [locations, setLocations] = useState<number[]>([]);

  const addLocation = (locationId: number) =>
    setLocations([...locations, locationId]);

  const removeLocation = (locationId: number) => {
    setLocations((prevLocations) =>
      prevLocations.filter((loc: number) => loc !== locationId)
    );
  };

  return (
    <SelectedLocationsContext.Provider
      value={{ locations, addLocation, removeLocation }}
    >
      {children}
    </SelectedLocationsContext.Provider>
  );
};
