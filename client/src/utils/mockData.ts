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

export const interpolationData = [
  {
    lon: -8.402028,
    lat: 40.222645,
    val: 16,
  },
  /* {
    lon: -8.42241867112619,
    lat: 40.225139306405,
    val: 20,
  },
  {
    lon: -8.42888798564339,
    lat: 40.2209505471073,
    val: 5,
  },
  {
    lon: -8.39957490384027,
    lat: 40.2247451644405,
    val: 37.5,
  },
  {
    lon: -8.39727987464586,
    lat: 40.2228444234987,
    val: 25,
  },
  {
    lon: -8.42262686613226,
    lat: 40.2240673261461,
    val: 9.35,
  },
  {
    lon: -8.43018130754563,
    lat: 40.2221973437929,
    val: 3.3,
  },
  {
    lon: -8.43730043314126,
    lat: 40.2191692143264,
    val: -2.3,
  },
  {
    lon: -8.395038,
    lat: 40.237747,
    val: 5.3,
  },
  {
    lon: -8.40355022347606,
    lat: 40.2182898879968,
    val: 76.3,
  }, */
];
