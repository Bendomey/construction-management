import { Box, Button, Flex, InfoIcon, Input, Pressable, Stack, Text, Icon, Center, Modal, Radio } from "native-base"
import { useDisclosure } from "../../../hooks/useDisclosure"

interface Props {
    type: 'Add' | 'Update'
    InvokeAttributeComponent: any
}

export const AttributeDialog = ({ type, InvokeAttributeComponent }: Props) => {
    const { isOpen, open, close } = useDisclosure()

    return (
        <>
            <InvokeAttributeComponent onPress={open} />
            <Modal isOpen={isOpen} onClose={close} size='md'>
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Attribute Manager</Modal.Header>
                    <Modal.Body>
                        <Box>
                            <Text mb={1}>Name *</Text>
                            <Input size='lg' />
                        </Box>

                        <Box mt={5}>
                            <Text mb={1}>Type *</Text>
                            <Box>
                                <Radio.Group defaultValue="1" name="attributeType" accessibilityLabel="select attribute type">
                                    <Radio size='sm' value="1" my={1} >
                                        Text
                                    </Radio>
                                    <Radio size='sm' value="2" my={1}>
                                        Number
                                    </Radio>
                                    <Radio size='sm' value="3" my={1}>
                                        Date
                                    </Radio>
                                    <Radio size='sm' value="4" my={1}>
                                        Checkbox
                                    </Radio>
                                </Radio.Group>
                            </Box>
                        </Box>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onPress={close} width='full'>
                            {type}
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </>
    )
}