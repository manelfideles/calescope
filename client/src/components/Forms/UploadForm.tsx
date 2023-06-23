import { Modal } from '../Modal';
import { Form } from './Form';
import { Steps } from '../Steps';
import { Input, Grid, GridItem } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { FormInput } from './FormInput';

const uploadSteps = [
  { title: 'Location' },
  { title: 'Variable' },
  { title: 'File' },
];

interface UploadFormProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const UploadForm = ({ isOpen, onClose }: UploadFormProps) => {
  const form = useForm<any>();
  return (
    <Modal
      modalTitle='Add New Variable'
      onClose={onClose}
      isOpen={isOpen}
      modalBody={
        <>
          <Steps titles={uploadSteps} />
          <Form<any>
            form={form}
            onSubmit={() => console.log('submitted upload')}
          >
            <Grid templateColumns='repeat(2, 1fr)' gap={5} mt={5}>
              <GridItem pr={5} borderRight='1px solid lightgray'>
                <FormInput
                  name='location-name'
                  label='Name'
                  fieldError={undefined}
                >
                  <Input />
                </FormInput>
                <Grid templateColumns='repeat(2, 1fr)' gap={5} mt={5}>
                  <GridItem>
                    <FormInput
                      name='location-latitude'
                      label='Latitude'
                      fieldError={undefined}
                    >
                      <Input type='number' />
                    </FormInput>
                  </GridItem>
                  <GridItem>
                    <FormInput
                      name='location-longitude'
                      label='Longitude'
                      fieldError={undefined}
                    >
                      <Input type='number' />
                    </FormInput>
                  </GridItem>
                </Grid>
              </GridItem>
              <GridItem>
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97475.51224215205!2d-8.498675291997548!3d40.22886179733836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd22f9144aacd16d%3A0x634564477b42a6b9!2sCoimbra!5e0!3m2!1sen!2spt!4v1687520649197!5m2!1sen!2spt'
                  width='100%'
                  height='100%'
                  loading='lazy'
                />
              </GridItem>
            </Grid>
          </Form>
        </>
      }
    />
  );
};
