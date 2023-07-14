import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useSelectedLocations } from './useSelectedLocations';
import { useRPC } from './useRPC';

interface GraphSliderProviderProps {
  children: React.ReactNode;
  defaultSliderValues: number[];
  variableId: number;
}

interface GraphSliderContextInterface {
  defaultSliderValues: number[];
  sliderValues: number[];
  setSliderValues: Dispatch<SetStateAction<number[]>>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
  sliderRange: number[];
  isLoadingSliderRange: boolean;
}

const initialState = {
  defaultSliderValues: [],
  sliderValues: [],
  setSliderValues: () => null,
  mode: 'value',
  setMode: () => null,
  sliderRange: [],
  isLoadingSliderRange: true,
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
  variableId,
}: GraphSliderProviderProps) => {
  const [sliderValues, setSliderValues] =
    useState<number[]>(defaultSliderValues);
  const [mode, setMode] = useState('value');
  const { locations } = useSelectedLocations();
  const [sliderRange, setSliderRange] = useState<number[]>([]);
  const { data: variableSliderRange, isLoading: isLoadingSliderRange } = useRPC(
    {
      rpcName: 'get_variable_value_range',
      convertToJson: false,
      params: {
        variable_id: variableId,
        location_ids: locations?.map(({ locationId }) => locationId) ?? [
          ...Array(20).keys(),
        ],
      },
    }
  );

  useEffect(() => {
    if (!isLoadingSliderRange && variableSliderRange) {
      setSliderRange([
        variableSliderRange?.[0]?.min_value,
        variableSliderRange?.[0]?.max_value,
      ]);
    }
  }, [variableSliderRange, isLoadingSliderRange]);

  return (
    <GraphSliderContext.Provider
      value={{
        mode,
        setMode,
        defaultSliderValues,
        sliderValues,
        setSliderValues,
        sliderRange,
        isLoadingSliderRange,
      }}
    >
      {children}
    </GraphSliderContext.Provider>
  );
};
