import { groupBy } from 'lodash';
import { LineSeries, FlexibleXYPlot } from 'react-vis';
import { getRandomColor } from '../../utils/mockData';
import { useLocalStorage } from 'usehooks-ts';
import { User } from '../../utils/types';
// import { useGraphSlider } from '../../hooks/useGraphSlider';

interface SparklineChartProps {
  data: any[];
  height: number;
  width: number;
}

const defaultUserValues: User = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  userSettings: {
    variables: [],
    unitSystem: 'metric',
  },
};

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
  ] = useLocalStorage<User>('settings', defaultUserValues);
  // const { mode, sliderRange, sliderValues } = useGraphSlider();
  const dataByVariable = Object.entries(groupBy(data, 'variable_id')).map(
    ([variable_id, variable_values]) => ({
      variable_id,
      values: variable_values.map(({ altitude, average_value }) => ({
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
      {dataByVariable.map(({ variable_id, values }) => (
        <LineSeries
          color={
            variables.filter(({ id }) => id === Number(variable_id))[0].color
          }
          curve='curveMonotoneX'
          data={values}
        />
      ))}
    </FlexibleXYPlot>
  );
};
