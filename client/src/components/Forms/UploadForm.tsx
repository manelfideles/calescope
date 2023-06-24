import { Modal } from '../Modal';
import { Form } from './Form';
import { Steps } from '../Steps';
import {
  Input,
  Grid,
  GridItem,
  useSteps,
  FormLabel,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { FormInput } from './FormInput';
import { Dropzone } from '../Dropzone';
import { useState } from 'react';
import { BsExclamationLg } from 'react-icons/bs';

interface UploadFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UploadForm = ({ isOpen, onClose }: UploadFormProps) => {
  const form = useForm<any>();
  const [csvContent, setCsvContent] = useState<number[][]>([]);
  const onSubmit = () => console.log('paula bobone');
  const steps = [
    {
      title: 'Location',
      content: (
        <>
          <GridItem pr={5} borderRight='1px solid lightgray'>
            <FormInput name='location-name' label='Name' fieldError={undefined}>
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
        </>
      ),
      buttons: [
        { text: 'Cancel', handler: onClose },
        { text: 'Next', handler: () => setActiveStep((step) => step + 1) },
      ],
    },
    {
      title: 'Variable',
      content: (
        <GridItem>
          <FormInput
            name='start-time'
            label='Start Timestamp'
            fieldError={undefined}
          >
            <Input
              placeholder='Select Date and Time'
              size='md'
              type='datetime-local'
              mb={5}
            />
          </FormInput>
          <FormInput
            name='end-time'
            label='End Timestamp'
            fieldError={undefined}
          >
            <Input
              placeholder='Select Date and Time'
              size='md'
              type='datetime-local'
            />
          </FormInput>
        </GridItem>
      ),
      buttons: [
        { text: 'Previous', handler: () => setActiveStep((step) => step - 1) },
        { text: 'Next', handler: () => setActiveStep((step) => step + 1) },
      ],
    },
    {
      title: 'File',
      content: (
        <>
          <GridItem pr={5} borderRight='1px solid lightgray'>
            <FormInput
              label='Upload .csv file'
              name='file-upload'
              fieldError={undefined}
            >
              <Dropzone setCsvContent={setCsvContent} />
            </FormInput>
          </GridItem>
          <GridItem>
            <FormLabel fontSize='sm'>Rendered uploaded .csv file</FormLabel>
            <TableContainer>
              {csvContent.length ? (
                <Table size='sm'>
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th isNumeric>Value</Th>
                      <Th isNumeric>Altitude</Th>
                      <Th isNumeric>Measurement Id</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {csvContent.slice(1, 6).map((row: number[]) => (
                      <Tr>
                        {row.map((elem: number) => (
                          <Td isNumeric>{elem}</Td>
                        ))}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              ) : (
                <Box
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  flexDir='column'
                  gap={2}
                  padding={10}
                >
                  <Tag colorScheme='red' padding={2}>
                    <TagLeftIcon boxSize='15px' as={BsExclamationLg} />
                    <TagLabel textAlign='center'>No file selected</TagLabel>
                  </Tag>
                  <Text textAlign='center' padding={2}>
                    Select a file to see the first 5 rows.
                  </Text>
                </Box>
              )}
            </TableContainer>
          </GridItem>
        </>
      ),
      buttons: [
        { text: 'Previous', handler: () => setActiveStep((step) => step - 1) },
        { text: 'Submit', handler: onSubmit },
      ],
    },
  ];
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  return (
    <Modal
      modalTitle='Add New Variable'
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
