import { Box, Button, Flex, InfoIcon, Input, Pressable, Stack, Text, Icon, Center, Modal, Radio, AlertDialog, IconButton, Toast } from "native-base"
import { useDisclosure } from "../../../hooks/useDisclosure"
import { useRef } from "react"
import Ionicons from '@expo/vector-icons/Ionicons';
import { MachineTypeAttribute } from "../../../models"

interface Props {
    onPress: VoidFunction
    data: MachineTypeAttribute
}

export const DeleteAttributeDialog = ({ onPress, data }: Props) => {
    const { isOpen, open, close } = useDisclosure()
    const cancelRef = useRef(null);

    return (
        <>
            <IconButton onPress={open} icon={<Icon as={Ionicons} name='trash-outline' color='red.600' />} />
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={close}>
                <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>Delete Attribute</AlertDialog.Header>
                    <AlertDialog.Body>
                        You are deleting this attribute, <Text fontWeight='bold'>{data.name}</Text>
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                            <Button variant="unstyled" colorScheme="coolGray" onPress={close} ref={cancelRef}>
                                Cancel
                            </Button>
                            <Button colorScheme="danger" onPress={() => {
                                onPress()
                                close()
                                Toast.show({
                                    description: "Attribute Deleted Successfully"
                                })
                            }}>
                                Delete
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </>
    )
}