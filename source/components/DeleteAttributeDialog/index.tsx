import { Box, Button, Flex, InfoIcon, Input, Pressable, Stack, Text, Icon, Center, Modal, Radio, AlertDialog, IconButton } from "native-base"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { RFValue } from "react-native-responsive-fontsize"
import { useDisclosure } from "../../../hooks/useDisclosure"
import { useRef } from "react"
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
}

export const DeleteAttributeDialog = ({ }: Props) => {
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
                        You are deleting this attribute, <Text fontWeight='bold'>Weight.</Text>
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                            <Button variant="unstyled" colorScheme="coolGray" onPress={close} ref={cancelRef}>
                                Cancel
                            </Button>
                            <Button colorScheme="danger" onPress={close}>
                                Delete
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </>
    )
}