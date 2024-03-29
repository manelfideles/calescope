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
import { useLocalStorage } from 'usehooks-ts';
import { User } from '../utils/types';
import { getDefaultUserValues } from '../utils/mockData';

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
  sparklineData: any[];
  isLoadingSparklineData: boolean;
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
  sparklineData: [],
  isLoadingSparklineData: true,
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
  const [
    {
      userSettings: { variables },
    },
    _setSettings,
  ] = useLocalStorage<User>('settings', getDefaultUserValues());
  const [sliderValues, setSliderValues] = useState<number[]>([0, 1]);
  const [mode, setMode] = useState('range');
  const { locations } = useSelectedLocations();
  const [sliderRange, setSliderRange] = useState<number[]>([]);
  const [countData, setCountData] = useState<any>([]);
  const [avgValueData, setAvgValueData] = useState<any>([]);
  const { data: variableSliderRange, isLoading: isLoadingSliderRange } = useRPC(
    {
      rpcName: 'get_variable_value_range',
      convertToJson: false,
      params: {
        variable_id: variableId,
        location_ids:
          locations.length === 0
            ? [...Array(20).keys()].slice(1)
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
      max_value: Math.ceil(sliderRange?.[1] ?? 220),
      location_ids:
        locations.length === 0
          ? [...Array(20).keys()]
          : locations?.map(({ locationId }) => locationId),
    },
  });
  const { data: sparklineData, isLoading: isLoadingSparklineData } = useRPC({
    rpcName: 'get_average_values_for_altitude',
    convertToJson: false,
    params: {
      selected_location_ids:
        locations.length === 0
          ? [...Array(20).keys()]
          : locations?.map(({ locationId }) => locationId),
      variable_ids: variables
        .filter(({ isSelected }) => isSelected)
        .map(({ id }) => id),
    },
  });

  useEffect(() => {
    if (!isLoadingSliderRange && variableSliderRange) {
      console.log({ variableSliderRange });
      if (variableSliderRange?.[0]?.min_value != null) {
        const formattedRange = [
          Math.floor(variableSliderRange?.[0]?.min_value),
          Math.ceil(variableSliderRange?.[0]?.max_value),
        ];
        setSliderRange(formattedRange);
        setSliderValues(formattedRange);
      }
      if (!isLoadingHistogramData && histogramData) {
        // for debug purposes
        /* const countsByValue = countBy(
          histogramData.map((d: Record<string, number>) => d.variable_value)
        );
        console.log({ countsByValue }); */
        setCountData(
          histogramData.map((d: Record<string, number>) => d.variable_value)
        );
      }
    }
    if (!isLoadingSparklineData && sparklineData) {
      setAvgValueData(sparklineData);
    }
  }, [
    variableSliderRange,
    isLoadingSliderRange,
    isLoadingSparklineData,
    sparklineData,
  ]);

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
        sparklineData: avgValueData,
        isLoadingSparklineData,
      }}
    >
      {children}
    </GraphSliderContext.Provider>
  );
};
