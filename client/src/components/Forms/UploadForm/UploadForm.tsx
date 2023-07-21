import { Modal } from '../../Modal';
import { Form } from '../Form';
import { Steps } from '../../Steps';
import { Grid, useSteps, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Step1, Step2, Step3 } from './steps';
import { useClient } from 'react-supabase';
import { useState } from 'react';
import { removeValueRowsWithOneElement } from '../../../utils/misc';

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
  variableId: null,
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
  const supabase = useClient();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async () => {
    const formValues = form.getValues();
    setIsSubmitting(true);
    if (!formValues.locationId) {
      const { data: locationId } = await supabase.rpc('insert_location', {
        name: formValues.locationName,
        lon: formValues.locationLongitude,
        lat: formValues.locationLatitude,
      });
      formValues['locationId'] = locationId;
    }
    if (!formValues.variableId) {
      const { data: variableId } = await supabase.rpc('insert_variable', {
        name: formValues.measuredVariable,
      });
      formValues['variableId'] = variableId;
    }
    const { data: measurementId } = await supabase.rpc('insert_measurement', {
      location_id: formValues.locationId,
      start_date: formValues.startTimestamp,
      end_date: formValues.endTimestamp,
      measured_variable_id: formValues.variableId,
    });
    formValues['measurementId'] = measurementId;
    const { data, error } = await supabase.rpc('insert_values', {
      arr: removeValueRowsWithOneElement(formValues.values),
      measurement_id: formValues.measurementId,
    });
    setIsSubmitting(false);
    if (!data) {
      toast({
        status: 'success',
        title: 'Success',
        description: 'Data uploaded!',
      });
      onClose();
    }
    if (error?.code)
      toast({ status: 'error', title: 'Error', description: error.details });
  };
  const steps = [
    {
      title: 'Location',
      content: <Step1 form={form} />,
      buttons: [
        { text: 'Cancel', handler: onClose },
        {
          text: 'Next',
          handler: () => setActiveStep((step) => step + 1),
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
          isDisabled: false,
          isSubmitting,
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
