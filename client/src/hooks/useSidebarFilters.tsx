import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type SliderValueType =
  | { mode: 'value'; val: number }
  | { mode: 'range'; val: number[] };

interface SidebarFiltersProviderProps {
  children: React.ReactNode;
}

interface SidebarFiltersContextInterface {
  timeSliderValues: SliderValueType;
  altitudeSliderValues: SliderValueType;
  variablesSliderValues: Record<string, SliderValueType>[];
}

const initialState = {
  timeSliderValues: { mode: 'value' as const, val: 0 },
  altitudeSliderValues: { mode: 'value' as const, val: 0 },
  variablesSliderValues: [],
};

export const SidebarFiltersContext =
  createContext<SidebarFiltersContextInterface>(initialState);

export const useSidebarFilters = () => {
  const context = useContext(SidebarFiltersContext);
  if (!context)
    throw Error('useSidebarFilters must be used within SidebarFiltersProvider');
  return context;
};

export const SidebarFiltersContextProvider = ({
  children,
}: SidebarFiltersProviderProps) => {
  return (
    <SidebarFiltersContext.Provider
      value={{
        timeSliderValues: { mode: 'value', val: 0 },
        altitudeSliderValues: { mode: 'value', val: 0 },
        variablesSliderValues: [],
      }}
    >
      {children}
    </SidebarFiltersContext.Provider>
  );
};
