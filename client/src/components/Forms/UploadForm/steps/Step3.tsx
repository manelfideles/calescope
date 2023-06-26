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
} from '@chakra-ui/react';
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
            </Box>
          )}
        </TableContainer>
      </GridItem>
    </>
  );
};
