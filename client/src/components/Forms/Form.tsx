import { ReactElement } from 'react';
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';

export interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  children: ReactElement | Array<ReactElement | null>;
  onSubmit: (data: any) => void;
  isReactive?: boolean;
}

export function Form<T extends FieldValues>({
  form,
  children,
  onSubmit,
  isReactive = false,
}: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={!isReactive ? form.handleSubmit(onSubmit) : undefined}
        onChange={isReactive ? form.handleSubmit(onSubmit) : undefined}
        style={{ flex: 1 }}
      >
        {children}
      </form>
    </FormProvider>
  );
}
