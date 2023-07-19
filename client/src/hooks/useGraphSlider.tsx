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
import { countBy, max, min } from 'lodash';

interface GraphSliderProviderProps {
  children: React.ReactNode;
  variableId: number;
}

interface GraphSliderContextInterface {
  sliderValues: number[];
  setSliderValues: Dispatch<SetStateAction<number[]>>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
  sliderRange: number[];
  isLoadingSliderRange: boolean;
  histogramData: any[];
  isLoadingHistogramData: boolean;
}

const initialState = {
  sliderValues: [],
  setSliderValues: () => null,
  mode: 'value',
  setMode: () => null,
  sliderRange: [],
  isLoadingSliderRange: true,
  histogramData: [],
  isLoadingHistogramData: true,
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
  variableId,
}: GraphSliderProviderProps) => {
  const [sliderValues, setSliderValues] = useState<number[]>([]);
  const [mode, setMode] = useState('value');
  const { locations } = useSelectedLocations();
  const [sliderRange, setSliderRange] = useState<number[]>([]);
  const [countData, setCountData] = useState<any>([]);
  const { data: variableSliderRange, isLoading: isLoadingSliderRange } = useRPC(
    {
      rpcName: 'get_variable_value_range',
      convertToJson: false,
      params: {
        variable_id: variableId,
        location_ids:
          locations.length === 0
            ? [...Array(20).keys()]
            : locations?.map(({ locationId }) => locationId),
      },
    }
  );
  const { data: histogramData, isLoading: isLoadingHistogramData } = useRPC({
    rpcName: 'get_measurement_counts_for_variable',
    convertToJson: false,
    params: {
      variable_id: variableId,
      min_value: Math.floor(sliderRange?.[0] ?? 0),
      max_value: Math.ceil(sliderRange?.[1] ?? 100),
      location_ids:
        locations.length === 0
          ? [...Array(20).keys()]
          : locations?.map(({ locationId }) => locationId),
    },
  });

  useEffect(() => {
    if (!isLoadingSliderRange && variableSliderRange) {
      if (variableSliderRange?.[0]?.min_value != null) {
        console.log({ variableSliderRange });
        const formattedRange = [
          Math.floor(variableSliderRange?.[0]?.min_value),
          Math.ceil(variableSliderRange?.[0]?.max_value),
        ];
        setSliderRange(formattedRange);
        setSliderValues(formattedRange);
      }
      if (!isLoadingHistogramData && histogramData) {
        // for debug purposes
        const countsByValue = countBy(
          histogramData.map((d: Record<string, number>) => d.variable_value)
        );
        console.log({ countsByValue });
        setCountData(
          histogramData.map((d: Record<string, number>) => d.variable_value)
        );
      }
    }
  }, [variableSliderRange, isLoadingSliderRange]);

  return (
    <GraphSliderContext.Provider
      value={{
        mode,
        setMode,
        sliderValues,
        setSliderValues,
        sliderRange,
        isLoadingSliderRange,
        histogramData: countData,
        isLoadingHistogramData,
      }}
    >
      {children}
    </GraphSliderContext.Provider>
  );
};
