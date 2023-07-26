import { LineSeries, FlexibleXYPlot } from 'react-vis';

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
  const dataByVariable = [];
  return (
    <FlexibleXYPlot
      height={height}
      width={width}
      margin={{ left: 0, top: 5, bottom: 0, right: 0 }}
    >
      <LineSeries color='tomato' curve='curveMonotoneX' data={data} />
    </FlexibleXYPlot>
  );
};
