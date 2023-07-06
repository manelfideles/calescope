import { HeatmapSeries, XAxis, XYPlot, YAxis } from 'react-vis';

const heatMapMockData = [
  { x: 1, y: 0, color: 10 },
  { x: 1, y: 5, color: 10 },
  { x: 1, y: 10, color: 6 },
  { x: 1, y: 15, color: 7 },
  { x: 2, y: 0, color: 12 },
  { x: 2, y: 5, color: 2 },
  { x: 2, y: 10, color: 1 },
  { x: 2, y: 15, color: 12 },
  { x: 3, y: 0, color: 9 },
  { x: 3, y: 5, color: 2 },
  { x: 3, y: 10, color: 6 },
  { x: 3, y: 15, color: 12 },
];

export const HeatMap = () => {
  return (
    <XYPlot width={450} height={300}>
      <XAxis hideLine hideTicks />
      <YAxis hideLine hideTicks />
      <HeatmapSeries data={heatMapMockData} />
    </XYPlot>
  );
};
