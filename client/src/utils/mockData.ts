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

export const areaChartData = [
  { x: 1, y: 90 },
  { x: 2, y: 12 },
  { x: 3, y: 34 },
  { x: 4, y: 53 },
  { x: 5, y: 52 },
  { x: 6, y: 9 },
  { x: 7, y: 18 },
  { x: 8, y: 78 },
  { x: 9, y: 28 },
  { x: 10, y: 34 },
];

export const generateHistogramData = (length: number, n_buckets: number) => {
  return Array.from({ length }, () => Math.floor(Math.random() * n_buckets));
};
