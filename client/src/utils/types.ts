import { Session, User as SupabaseUser } from '@supabase/supabase-js';

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userSettings: Settings;
};

export interface StepProps {
  form: any;
}

export type Settings = {
  variables: Array<Variable>;
  unitSystem: 'imperial' | 'metric';
};

export type Variable = {
  id: number;
  name: string;
  isSelected: boolean;
  color: string;
};

export type SignUpInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type SignInInputs = Pick<SignUpInputs, 'password' | 'email'>;

export type AuthState = {
  session?: Session | null;
  user?: SupabaseUser | null;
  isLoggedIn: boolean;
};

export type SliderValuesType = {
  mode: 'value' | 'range';
  val: (string | number) | Array<string | number>;
};

export type Route = {
  path: string;
  element: React.ReactNode;
  pageName: string;
  showIfLoggedOut?: boolean;
};

export type SelectedLocation = {
  locationId: number;
  isVisible: boolean;
  locationName: string;
  color: string;
};
