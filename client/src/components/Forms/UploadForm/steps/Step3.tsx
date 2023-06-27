import {
  GridItem,
  FormLabel,
  TableContainer,
  Table,
  Thead,
  Text,
  Tr,
  Th,
  Tbody,
  Td,
  Tag,
  TagLeftIcon,
  TagLabel,
  Box,
  Flex,
} from '@chakra-ui/react';
import { startCase } from 'lodash';
import { useState } from 'react';
import { BsExclamationLg } from 'react-icons/bs';
import { StepProps } from '../../../../utils/types';
import { Dropzone } from '../../../Dropzone';
import { FormInput } from '../../FormInput';

export const Step3 = ({ form }: StepProps) => {
  const [csvContent, setCsvContent] = useState<number[][]>([]);

  return (
    <>
      <GridItem pr={5} borderRight='1px solid lightgray'>
        <FormInput
          label='Upload .csv file'
          name='file-upload'
          fieldError={form.formState.errors.values}
          {...form.register('values', {
            required: 'Select a file to upload it to Calescope',
          })}
        >
          <Dropzone setCsvContent={setCsvContent} form={form} />
        </FormInput>
      </GridItem>
      <GridItem>
        <FormLabel fontSize='sm'>Rendered uploaded .csv file</FormLabel>
        <TableContainer>
          {csvContent.length ? (
            <Table size='sm'>
              <Thead>
                <Tr>
                  <Th isNumeric>ID</Th>
                  <Th isNumeric>
                    {startCase(form.getValues().measuredVariable)}
                  </Th>
                  <Th isNumeric>Altitude</Th>
                </Tr>
              </Thead>
              <Tbody>
                {csvContent.slice(1, 6).map((row: number[], index: number) => (
                  <Tr>
                    <Td textAlign='right'>{index}</Td>
                    {row.map((elem: number) => (
                      <Td isNumeric>{elem}</Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Flex
              alignItems='center'
              flexDir='column'
              gap={2}
              padding={10}
              border='1px solid lightgray'
              rounded='lg'
            >
              <Tag colorScheme='red' padding={2}>
                <TagLeftIcon boxSize='15px' as={BsExclamationLg} />
                <TagLabel textAlign='center'>No file selected</TagLabel>
              </Tag>
              <Text textAlign='center' padding={2}>
                Select a file to see the first 5 rows.
              </Text>
            </Flex>
          )}
        </TableContainer>
      </GridItem>
    </>
  );
};
