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
  unitSystem: 'metric',
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

export const getRandomColor = () => {
  const colorArray = [
    // plasma
    '#0D0887',
    '#41049D',
    '#6A00A8',
    '#8F0DA4',
    '#B12A90',
    '#CC4778',
    '#E16462',
    '#F2844B',
    '#FCA636',
    '#FCCE25',
    '#F0F921',
    // cubehelix default
    '#23171B',
    '#4A58DD',
    '#2F9DF5',
    '#27D7C4',
    '#4DF884',
    '#95FB51',
    '#DEDD32',
    '#FFA423',
    '#F65F18',
    '#BA2208',
    '#900C00',
    // cividis
    '#002051',
    '#0A326A',
    '#2B446E',
    '#4D566D',
    '#696970',
    '#7F7C75',
    '#948F78',
    '#ADA476',
    '#CABA6A',
    '#EAD156',
    '#FDEA45',
  ];
  const randomIndex = Math.floor(Math.random() * (colorArray.length - 1));
  console.log({ randomIndex });

  return colorArray[randomIndex];
};

export const generateHistogramData = (length: number, n_buckets: number) => {
  return Array.from({ length }, () => Math.floor(Math.random() * n_buckets));
};
