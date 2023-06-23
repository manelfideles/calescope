import { Settings } from './types';

export const userSettings: Settings = {
  variables: [
    { id: 1, name: 'Temperature', isSelected: true },
    { id: 2, name: 'Humidity', isSelected: true },
    { id: 3, name: 'Pressure', isSelected: true },
    { id: 4, name: 'Example 4', isSelected: false },
    { id: 5, name: 'Example 5', isSelected: false },
    { id: 6, name: 'Example 6', isSelected: false },
    { id: 7, name: 'Example 7', isSelected: false },
    { id: 8, name: 'Example 8', isSelected: false },
  ],
  metricSystem: 'metric',
};

const generateAreaChartData = (length: number = 10, upperBound: number = 40) =>
  Array(length)
    .fill({})
    .map((_e, i) => ({ x: i, y: Math.random() * upperBound }));

export const areaChartData = [
  {
    locationName: 'locationName-1',
    locationId: 1,
    data: generateAreaChartData(),
    color: '#339999',
  },
  {
    locationName: 'locationName-2',
    locationId: 2,
    data: generateAreaChartData(),
    color: '#66ccff',
  },
  {
    locationName: 'locationName-3',
    locationId: 3,
    data: generateAreaChartData(),
    color: '#1a3177',
  },
];

export const getRandomColor = () =>
  '#' + Math.floor(Math.random() * 16777215).toString(16);

export const generateHistogramData = (length: number, n_buckets: number) => {
  return Array.from({ length }, () => Math.floor(Math.random() * n_buckets));
};
