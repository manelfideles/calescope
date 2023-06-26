import { toLower } from 'lodash';
import { Controller } from 'react-hook-form';
import { CreatableSelect as ReactCreatableSelect } from 'chakra-react-select';
import { Flex, Icon } from '@chakra-ui/react';
import { GrFormAdd } from 'react-icons/gr';

interface CreatableSelectProps {
  form: any;
  isLoading: boolean;
  onChange?: (v?: any, onChange?: any) => void;
  options: any[];
  fieldName: string;
  placeholderText: string;
  stepNumber: number;
}

export const CreatableSelect = ({
  form,
  isLoading,
  onChange,
  options,
  fieldName,
  placeholderText,
  stepNumber,
}: CreatableSelectProps) => {
  const formatCreateLocationLabel = (inputValue: string) => (
    <Flex alignItems='center' gap={1}>
      <Icon as={GrFormAdd} color='blue' w={5} h={5} ml={-6} />
      Create "{inputValue}"
    </Flex>
  );
  return (
    <Controller
      control={form.control}
      {...form.register(fieldName, {
        required: 'This field is required',
      })}
      render={({ field: { onChange: onFormChange } }) => (
        <ReactCreatableSelect
          isLoading={isLoading}
          onChange={(v: any) => {
            switch (stepNumber) {
              case 1:
                onChange!(v, onFormChange);
                break;
              case 2: {
                onFormChange(toLower(v?.label.replace(' ', '_')));
                form.setValue('variableId', v.id);
                break;
              }
              default:
                break;
            }
          }}
          createOptionPosition='first'
          formatCreateLabel={formatCreateLocationLabel}
          options={options}
          placeholder={placeholderText}
          selectedOptionStyle='check'
          chakraStyles={{
            dropdownIndicator: (provided) => ({
              ...provided,
              bg: 'transparent',
              px: 2,
              cursor: 'inherit',
            }),
            indicatorSeparator: (provided) => ({
              ...provided,
              display: 'none',
            }),
          }}
        />
      )}
    />
  );
};
