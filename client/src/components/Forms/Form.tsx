import { ReactElement } from 'react'
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';

export interface FormProps<T extends FieldValues> {
	form: UseFormReturn<T>,
	children: ReactElement | Array<ReactElement | null>,
	onSubmit: (data: any) => void,
}

export function Form<T extends FieldValues>({ form, children, onSubmit }: FormProps<T>) {
	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} style={{ flex: 1 }}>
				{children}
			</form>
		</FormProvider>
	)
}
