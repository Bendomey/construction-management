import { Box, Button, InfoIcon, Input, Pressable, Text, Center, Modal, Flex, IconButton, Icon, Checkbox, Badge } from "native-base"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { RFValue } from "react-native-responsive-fontsize"
import { AttributeDialog } from "../AttributeDialog"
import Ionicons from '@expo/vector-icons/Ionicons';
import { DeleteAttributeDialog } from "../DeleteAttributeDialog";

interface Props {
    isOpen: boolean
    close: VoidFunction
}

const attributes = [1]
export const AddMachineType = ({ isOpen, close }: Props) => {
    return (
        <Modal isOpen={isOpen} onClose={close} size='xl'>
            <Modal.Content h="full">
                <Modal.CloseButton />
                <Modal.Header>Add New Machine Type</Modal.Header>
                <Modal.Body>
                    {/* <KeyboardAwareScrollView style={{ flex: 1, paddingHorizontal: RFValue(5), paddingTop: RFValue(5) }}> */}
                        <Text mb={1}>Name *</Text>
                        <Input size='2xl' />
                    {/* </KeyboardAwareScrollView> */}

                    <Box mt={5}>
                        <Text mb={1} color='gray.400'>ATTRIBUTES</Text>
                        {
                            attributes.length ? (
                                <>
                                    <AttributeDialog type='Add' InvokeAttributeComponent={({ onPress }) => (
                                        <AddNewAttribute onPress={onPress} />
                                    )} />

                                    <Attribute active={true} />
                                    <Attribute />
                                    <Attribute />
                                </>
                            ) : (
                                <NoAttributesAdded />
                            )
                        }
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

interface Attribute {
    active?: boolean
}

const Attribute = ({ active = false }: Attribute) => {
    return (
        <Pressable mt={2} onPress={() => { console.log("hello") }}>
            <Box borderWidth={active ? 1 : 0.5} p={2} borderColor={active ? 'blue.600' : 'gray.200'} borderRadius='md'>
                <Flex flexDirection='row' alignItems='flex-start' justifyContent='space-between'>
                    <Box display='flex' alignItems='flex-start' width='70%'>
                        <Text fontWeight='bold'>Weight</Text>
                        <Badge colorScheme="blue" mt={2}>Checkbox</Badge>
                    </Box>
                    <Flex flexDirection='row' alignItems='center' justifyContent='space-between'>
                        <AttributeDialog type='Update' InvokeAttributeComponent={({ onPress }) => (
                            <IconButton onPress={onPress} icon={<Icon as={Ionicons} name='create-outline' />} />
                        )} />
                        <DeleteAttributeDialog />
                    </Flex>
                </Flex>
            </Box>
        </Pressable>
    )
}

interface AddNewAttributeProps {
    onPress: VoidFunction
}
const AddNewAttribute = ({ onPress }: AddNewAttributeProps) => {
    return (
        <Pressable mt={2} onPress={onPress}>
            <Center  p={2} borderStyle='dashed' borderRadius='md' borderWidth={1} borderColor='gray.300'>
                <Text>Add New Attribute</Text>
            </Center>
        </Pressable>
    )
}

const NoAttributesAdded = () => {
    return (
        <Center py='5'>
            <InfoIcon size='5' />
            <Text color='gray.400' mt='2'>No Attributes added</Text>
            <AttributeDialog type='Add' InvokeAttributeComponent={({ onPress }) => (
                <Button mt='2' onPress={onPress}>
                    Add Attribute
                </Button>
            )} />
        </Center>
    )
}