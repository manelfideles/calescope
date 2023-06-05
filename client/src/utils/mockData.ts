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
