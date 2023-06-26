import {
  Flex,
  Button,
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

interface ModalProps {
  modalTitle: string;
  isOpen: boolean;
  modalBody: React.ReactNode;
  onClose: () => void;
  buttons: {
    text: string;
    handler: () => void;
    isDisabled?: boolean;
    isSubmitting?: boolean;
  }[];
}

export const Modal = ({
  isOpen,
  modalTitle,
  modalBody,
  buttons,
  onClose,
}: ModalProps) => {
  return (
    <ChakraModal size='4xl' onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{modalBody}</ModalBody>
        <ModalFooter>
          <Flex gap={2}>
            <Button onClick={buttons[0].handler} variant='outline'>
              {buttons[0].text}
            </Button>
            <Button
              onClick={buttons[1].handler}
              colorScheme='teal'
              isDisabled={buttons[1].isDisabled}
              isLoading={buttons[1].isSubmitting}
              type='button'
            >
              {buttons[1].text}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};
