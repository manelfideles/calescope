import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface GraphSliderProviderProps {
  children: React.ReactNode;
  defaultSliderValues: number[];
}

interface GraphSliderContextInterface {
  defaultSliderValues: number[];
  sliderValues: number[];
  setSliderValues: Dispatch<SetStateAction<number[]>>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
}

const initialState = {
  defaultSliderValues: [],
  sliderValues: [],
  setSliderValues: () => null,
  mode: 'value',
  setMode: () => null,
};

export const GraphSliderContext =
  createContext<GraphSliderContextInterface>(initialState);

export const useGraphSlider = () => {
  const context = useContext(GraphSliderContext);
  if (!context)
    throw Error('useGraphSlider must be used within GraphSliderProvider');
  return context;
};

export const GraphSliderContextProvider = ({
  children,
  defaultSliderValues,
}: GraphSliderProviderProps) => {
  const [sliderValues, setSliderValues] =
    useState<number[]>(defaultSliderValues);
  const [mode, setMode] = useState('value');
  return (
    <GraphSliderContext.Provider
      value={{
        mode,
        setMode,
        defaultSliderValues,
        sliderValues,
        setSliderValues,
      }}
    >
      {children}
    </GraphSliderContext.Provider>
  );
};
