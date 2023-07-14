import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';

interface FormInputProps {
  name: string;
  label: string;
  helperText?: string;
  isRequired?: boolean;
  fieldError: any;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const FormInput = ({
  label,
  children,
  isRequired,
  fieldError,
  helperText,
  style,
}: FormInputProps) => {
  return (
    <FormControl
      isRequired={isRequired ?? false}
      isInvalid={fieldError ?? false}
    >
      <Box style={style}>
        {!!label && <FormLabel fontSize='sm'>{label}</FormLabel>}
        {children}
        <FormErrorMessage>{fieldError && fieldError.message}</FormErrorMessage>
        {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
      </Box>
    </FormControl>
  );
};
