import { Box, Button, Flex, InfoIcon, Input, Pressable, Stack, Text, Icon, Center, Modal, Radio, AlertDialog, IconButton, Toast } from "native-base"
import { useDisclosure } from "../../../hooks/useDisclosure"
import { useRef } from "react"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAppDispatch } from "../../state"
import { MachineType } from "../../../models"
import { DELETE_MACHINE_TYPE_ACTION } from "../../state/slices/app.slice";

interface Props {
    data: MachineType
    index: number
}

export const DeleteMachineTypeDialog = ({ data, index }: Props) => {
    const { isOpen, open, close } = useDisclosure()
    const cancelRef = useRef(null);
    const dispatch = useAppDispatch()

    const onSubmit = () => {
        dispatch(
            DELETE_MACHINE_TYPE_ACTION(data.id)
        )
        Toast.show({
            description: `${data.name} has been deleted.`
        })
        close()
    }

    return (
        <>
            <IconButton variant='subtle' onPress={open} ml={2} backgroundColor='red.600' icon={<Icon as={Ionicons} size='sm' name='trash-outline' color='white' />} />
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={close}>
                <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>Delete Machine Type</AlertDialog.Header>
                    <AlertDialog.Body>
                        You are deleting this machine type, <Text fontWeight='bold'>{data.name}</Text>
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                            <Button variant="unstyled" colorScheme="coolGray" onPress={close} ref={cancelRef}>
                                Cancel
                            </Button>
                            <Button colorScheme="danger" onPress={onSubmit}>
                                Delete
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </>
    )
}