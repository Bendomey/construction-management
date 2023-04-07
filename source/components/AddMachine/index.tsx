import { Box, Button, InfoIcon, Input, Pressable, Text, Center, Modal, Flex, IconButton, Icon, Badge, Checkbox } from "native-base"
import { BlockTypes } from "../../../types";
import {  InterfaceCheckbox } from "native-base/lib/typescript/components/primitives/Checkbox/types";
import { InterfaceInputProps } from "native-base/lib/typescript/components/primitives/Input/types";

interface Props {
    isOpen: boolean
    close: VoidFunction
}

export const AddMachine = ({ isOpen, close }: Props) => {
    return (
        <Modal isOpen={isOpen} onClose={close} size='xl'>
            <Modal.Content h="full">
                <Modal.CloseButton />
                <Modal.Header>Add New Machine</Modal.Header>
                <Modal.Body>
                    <Box>
                        <Text mb={1}>Name *</Text>
                        <Field blockType="TEXT" input={{
                        }} />
                    </Box>
                    <Box mt={3}>
                        <Text mb={1}>Age *</Text>
                        <Field blockType="NUMBER" input={{
                            value: "123",
                            keyboardType: 'number-pad'
                        }} />
                    </Box>
                    <Box mt={3}>
                        <Field blockType="CHECKBOX" checkbox={{
                            value: "",
                            isChecked: true
                        }} />
                    </Box>
                </Modal.Body>
                <Modal.Footer>
                    <Button onPress={close} width='full'>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}

interface FieldProps {
    blockType: BlockTypes
    checkbox?: InterfaceCheckbox
    input?: InterfaceInputProps
}

const Field = ({ blockType, checkbox, input }: FieldProps) => {
    switch (blockType) {
        case "CHECKBOX":
            return <Checkbox {...checkbox} color="green">Does it work?</Checkbox>

        case "DATE":
        case "TEXT":
        case "NUMBER":
        default:
            return <Input size='2xl' {...input} value={''} _disabled={{ backgroundColor: 'gray.200' }} />
    }
}