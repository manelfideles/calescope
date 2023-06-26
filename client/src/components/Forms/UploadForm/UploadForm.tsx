import { Modal } from '../../Modal';
import { Form } from '../Form';
import { Steps } from '../../Steps';
import { Grid, useSteps } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Step1, Step2, Step3 } from './steps';

interface UploadFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const formDefaultValues = {
  locationName: null,
  locationLatitude: '',
  locationLongitude: '',
  locationId: null,
  isNewLocation: null,
  startTimestamp: '',
  endTimestamp: '',
  measuredVariable: '',
};

export const UploadForm = ({ isOpen, onClose }: UploadFormProps) => {
  const form = useForm<any>({
    reValidateMode: 'onBlur',
    criteriaMode: 'all',
    defaultValues: formDefaultValues,
  });
  const onSubmit = () => console.log(form.getValues());

  const steps = [
    {
      title: 'Location',
      content: <Step1 form={form} />,
      buttons: [
        { text: 'Cancel', handler: onClose },
        {
          text: 'Next',
          handler: () => console.log(form.getValues()),
          isDisabled: false,
        },
      ],
    },
    {
      title: 'Variable',
      content: <Step2 form={form} />,
      buttons: [
        { text: 'Previous', handler: () => setActiveStep((step) => step - 1) },
        {
          text: 'Next',
          handler: () => setActiveStep((step) => step + 1),
          isDisabled: false,
        },
      ],
    },
    {
      title: 'File',
      content: <Step3 form={form} />,
      buttons: [
        { text: 'Previous', handler: () => setActiveStep((step) => step - 1) },
        {
          text: 'Submit',
          handler: onSubmit,
          isDisabled: !form.formState.isDirty || !form.formState.isValid,
        },
      ],
    },
  ];
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  return (
    <Modal
      modalTitle='Add Data'
      onClose={onClose}
      buttons={steps[activeStep].buttons}
      isOpen={isOpen}
      modalBody={
        <>
          <Steps
            steps={steps.map(({ title }) => title)}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
          <Form<any> form={form} onSubmit={onSubmit}>
            <Grid templateColumns='repeat(2, 1fr)' gap={5} mt={5}>
              {steps[activeStep].content}
            </Grid>
          </Form>
        </>
      }
    />
  );
};
