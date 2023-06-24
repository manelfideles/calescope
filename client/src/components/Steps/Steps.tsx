import {
  Box,
  useSteps,
  Stepper,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

interface StepsProps {
  steps: string[];
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
}

export const Steps = ({ steps, activeStep, setActiveStep }: StepsProps) => {
  return (
    <Stepper index={activeStep}>
      {steps.map((step, index) => (
        <Step key={index} onClick={() => setActiveStep(index)}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>
          <Box>
            <StepTitle>{step}</StepTitle>
          </Box>
          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};
