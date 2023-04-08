import { Box, Button, Flex, InfoIcon, Input, Pressable, Stack, Text, Icon, Center, Modal, Radio, AlertDialog, IconButton, Toast } from "native-base"
import { useDisclosure } from "../../../hooks/useDisclosure"
import { useRef } from "react"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAppDispatch } from "../../state";
import { DELETE_MACHINE_ACTION } from "../../state/slices/app.slice";

interface Props {
    title: string
    id: string
}

export const DeleteMachineDialog = ({ title, id }: Props) => {
    const { isOpen, open, close } = useDisclosure()
    const cancelRef = useRef(null);
    const dispatch = useAppDispatch()

    const handleSubmit = () => {
        dispatch(
            DELETE_MACHINE_ACTION(id)
        )
        Toast.show({
            description: `${title ?? 'Machine'} has been deleted.`
        })
        close()
    }

    return (
        <>
            <IconButton variant='subtle' onPress={open} ml={2} backgroundColor='red.600' icon={<Icon as={Ionicons} size='sm' name='trash-outline' color='white' />} />
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={close}>
                <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>Delete Machine</AlertDialog.Header>
                    <AlertDialog.Body>
                        You are deleting this machine, <Text fontWeight='bold'>{title}.</Text>
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                            <Button variant="unstyled" colorScheme="coolGray" onPress={close} ref={cancelRef}>
                                Cancel
                            </Button>
                            <Button colorScheme="danger" onPress={handleSubmit}>
                                Delete
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </>
    )
}