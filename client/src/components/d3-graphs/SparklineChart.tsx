import { groupBy } from 'lodash';
import { LineSeries, FlexibleXYPlot } from 'react-vis';
import { useLocalStorage } from 'usehooks-ts';
import { User } from '../../utils/types';
import { getDefaultUserValues } from '../../utils/mockData';
import { useGraphSlider } from '../../hooks/useGraphSlider';

interface SparklineChartProps {
  data: any[];
  height: number;
  width: number;
}

export const SparklineChart = ({
  data,
  width,
  height,
}: SparklineChartProps) => {
  const [
    {
      userSettings: { variables },
    },
    _setSettings,
  ] = useLocalStorage<User>('settings', getDefaultUserValues());
  const { sliderValues } = useGraphSlider();
  const dataByVariable = Object.entries(groupBy(data, 'variable_id')).map(
    ([variable_id, variable_values]) => ({
      variable_id,
      values: variable_values.map(({ altitude, average_value }) => ({
        x: altitude,
        y: average_value,
      })),
    })
  );
  const filteredData = Object.entries(groupBy(data, 'variable_id')).map(
    ([variable_id, variable_values]) => ({
      variable_id,
      values: variable_values
        .filter(
          ({ altitude }) =>
            altitude >= sliderValues[0] && altitude <= sliderValues[1]
        )
        .map(({ altitude, average_value }) => ({
          x: altitude,
          y: average_value,
        })),
    })
  );

  return (
    <FlexibleXYPlot
      height={height}
      width={width}
      margin={{ left: 0, top: 5, bottom: 0, right: 0 }}
    >
      {dataByVariable.map(({ values }) => (
        <LineSeries data={values} color='lightgray' opacity={0.5} />
      ))}
      {filteredData.map(({ variable_id, values }) => (
        <LineSeries
          data={values}
          color={
            variables.filter(({ id }) => id === Number(variable_id))[0].color
          }
        />
      ))}
    </FlexibleXYPlot>
  );
};
