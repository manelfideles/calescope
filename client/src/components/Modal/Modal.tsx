import { Flex, Button, Modal as ChakraModal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"

interface ModalProps {
    modalTitle: string,
    onClose: () => void,
    isOpen: boolean,
    modalBody: React.ReactNode,
}

export const Modal = ({ onClose, isOpen, modalTitle, modalBody }: ModalProps) => {
    return (
        <ChakraModal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {modalTitle}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {modalBody}
                </ModalBody>
                <ModalFooter>
                    <Flex gap={2}>
                        <Button 
                            onClick={onClose} 
                            colorScheme='red'
                            size='xs'
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={() => console.log('Submit New Variable')} 
                            colorScheme='green'
                            size='xs'
                        >
                            Submit
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </ChakraModal>
    )
  }