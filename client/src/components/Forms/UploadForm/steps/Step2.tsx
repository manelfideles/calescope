import { GridItem, Input } from '@chakra-ui/react';
import { CreatableSelect } from '../../../CreatableSelect';
import { startCase, toLower } from 'lodash';
import { useMemo } from 'react';
import { useRPC } from '../../../../hooks/useRPC';
import { StepProps, Variable } from '../../../../utils/types';
import { FormInput } from '../../FormInput';

export const Step2 = ({ form }: StepProps) => {
  const {
    data: availableVariablesData,
    error: availableVariablesError,
    isLoading: isLoadingAvailableVariables,
  } = useRPC({
    rpcName: 'get_variables',
    convertToJson: false,
  });

  const availableVariableOptions = useMemo(
    () =>
      availableVariablesData?.map(
        ({ id, name }: Omit<Variable, 'isSelected'>) => ({
          label: startCase(toLower(name)),
          value: toLower(name.replace(' ', '-')),
          id,
        })
      ),
    [availableVariablesData]
  );
  return (
    <>
      <GridItem pr={5} borderRight='1px solid lightgray'>
        <FormInput
          name='startTimestamp'
          label='Start Timestamp'
          fieldError={form.formState.errors.startTimestamp}
        >
          <Input
            placeholder='Select Date and Time'
            size='md'
            type='datetime-local'
            mb={5}
            {...form.register('startTimestamp', {
              required: 'This field is required.',
            })}
          />
        </FormInput>
        <FormInput
          name='endTimestamp'
          label='End Timestamp'
          fieldError={form.formState.errors.endTimestamp}
        >
          <Input
            placeholder='Select Date and Time'
            size='md'
            type='datetime-local'
            {...form.register('endTimestamp', {
              required: 'This field is required.',
            })}
          />
        </FormInput>
      </GridItem>
      <GridItem>
        <FormInput
          name='measuredVariable'
          label='Measured Variable'
          fieldError={form.formState.errors.measuredVariable}
          isRequired
        >
          {/* <Controller
            control={form.control}
            {...form.register('measuredVariable', {
              required: 'This field is required',
            })}
            render={({ field: { onChange } }) => (
              <CreatableSelect
                isLoading={isLoadingAvailableVariables}
                onChange={(v: any) =>
                  onChange(toLower(v?.label.replace(' ', '_')))
                }
                createOptionPosition='first'
                formatCreateLabel={formatCreateLocationLabel}
                options={availableVariableOptions}
                placeholder='Select a location'
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
          /> */}
          <CreatableSelect
            form={form}
            isLoading={isLoadingAvailableVariables}
            options={availableVariableOptions}
            fieldName='measuredVariable'
            placeholderText='Select a location'
            stepNumber={2}
          />
        </FormInput>
      </GridItem>
    </>
  );
};
