import { Box, FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react'

interface FormInputProps {
	name: string,
	label: string,
	helperText?: string,
	isRequired?: boolean,
	fieldError: any,
	children: React.ReactNode,
}

export const FormInput = ({
	label, children,
	isRequired,
	fieldError, helperText
}: FormInputProps) => {
	return (
		<Box>
			<FormControl isRequired={isRequired ?? false}>
				{!!label && <FormLabel fontSize='sm'>{label}</FormLabel>}
				{children}
				{!!helperText && <FormHelperText>{helperText}</FormHelperText>}
				<FormErrorMessage>
					{fieldError && fieldError.message}
				</FormErrorMessage>
			</FormControl>
		</Box>
	)
}
