export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userSettings: Settings;
};

export type Settings = {
  variables: Array<Variable>;
  metricSystem: 'imperial' | 'metric';
};

export type Variable = {
  id: number;
  name: string;
  isSelected: boolean;
};
