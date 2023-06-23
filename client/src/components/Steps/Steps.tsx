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

interface StepsProps {
  titles: Record<string, string>[];
}

export const Steps = ({ titles }: StepsProps) => {
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: titles.length,
  });

  const steps = titles.map((step, index) => (
    <Step key={index} onClick={() => setActiveStep(index)}>
      <StepIndicator>
        <StepStatus
          complete={<StepIcon />}
          incomplete={<StepNumber />}
          active={<StepNumber />}
        />
      </StepIndicator>
      <Box>
        <StepTitle>{step.title}</StepTitle>
      </Box>
      <StepSeparator />
    </Step>
  ));

  return <Stepper index={activeStep}>{steps}</Stepper>;
};
