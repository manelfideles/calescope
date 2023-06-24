import { Badge, CloseButton, Flex, Icon } from '@chakra-ui/react';
import { useCSVReader } from 'react-papaparse';
import { PiFileCsv } from 'react-icons/pi';
import { Dispatch, SetStateAction } from 'react';

interface DropzoneProps {
  setCsvContent: Dispatch<SetStateAction<number[][]>>;
}

export const Dropzone = ({ setCsvContent }: DropzoneProps) => {
  const { CSVReader } = useCSVReader();
  return (
    <CSVReader
      //@ts-ignore
      onUploadAccepted={({ data }: (number | string)[]) =>
        setCsvContent(data.slice(1))
      }
    >
      {({ getRootProps, acceptedFile, getRemoveFileProps }: any) => {
        return (
          <Flex
            border='1px dashed lightgray'
            rounded='lg'
            p={5}
            {...getRootProps()}
          >
            {acceptedFile ? (
              <Badge fontWeight='normal' pr={0}>
                <Flex gap={1} alignItems='center' pl={1}>
                  <Icon as={PiFileCsv} />
                  {acceptedFile.name}
                  <div {...getRemoveFileProps()}>
                    <CloseButton onClick={() => setCsvContent([])} />
                  </div>
                </Flex>
              </Badge>
            ) : (
              'Drop CSV file here or click to upload'
            )}
          </Flex>
        );
      }}
    </CSVReader>
  );
};
