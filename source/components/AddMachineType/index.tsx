import { Box, Button, InfoIcon, Input, Pressable, Text, Center, Modal, Flex, IconButton, Icon, Badge } from "native-base"
import { AttributeDialog } from "../AttributeDialog"
import Ionicons from '@expo/vector-icons/Ionicons';
import { DeleteAttributeDialog } from "../DeleteAttributeDialog";
import * as Yup from 'yup';
import { Formik } from "formik";
import { BlockTypes } from "../../../types";

interface Props {
    isOpen: boolean
    close: VoidFunction
}

interface AttributesProps {
    name: string;
    type: BlockTypes
}

interface FormFieldsParams {
    name: string;
    attributes: Array<AttributesProps>
}

const validationSchema = Yup.object({
    name: Yup.string().required("Name of Required"),
    attributes: Yup.array(
        Yup.object({
            name: Yup.string().required("Name of Required"),
            type: Yup.string().oneOf(['TEXT', 'NUMBER', 'CHECKBOX', 'DATE']).required("Name of Required"),
        })
    )
});

const attributes = [1]
export const AddMachineType = ({ isOpen, close }: Props) => {

    const handleSubmit = (values: FormFieldsParams) => {
        console.log(values)
    }

    return (
        <Formik
            initialValues={{ name: '', attributes: [] }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {
                ({ handleChange, handleBlur, handleSubmit, values, errors, handleReset }) => (
                    <Modal
                        isOpen={isOpen}
                        onClose={() => {
                            handleReset();
                            close();
                        }}
                        size='xl'>
                        <Modal.Content h="full">
                            <Modal.CloseButton />
                            <Modal.Header>Add New Machine Type</Modal.Header>
                            <Modal.Body>
                                <Text mb={1}>Name *</Text>
                                <Input size='2xl' isInvalid={Boolean(errors.name)}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                />
                                {
                                    errors.name ? <Text fontSize="xs" color='red.600'>Name of Required</Text> : null
                                }
                                <Box mt={5}>
                                    <Text mb={1} color='gray.400'>ATTRIBUTES</Text>
                                    {
                                        attributes.length ? (
                                            <>
                                                <AttributeDialog type='Add' InvokeAttributeComponent={({ onPress }) => (
                                                    <AddNewAttribute onPress={onPress} />
                                                )} />
                                                <Text mt={4} fontSize='xs' color='gray.400'>NB: Click on an attribute to make it the title attribute.</Text>
                                                <Attribute active={true} />
                                                <Attribute />
                                                <Attribute />
                                            </>
                                        ) : <NoAttributesAdded />
                                    }
                                </Box>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onPress={() => handleSubmit()} width='full'>
                                    Add
                                </Button>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>
                )
            }
        </Formik>
    )
}

interface Attribute {
    active?: boolean
}

const Attribute = ({ active = false }: Attribute) => {
    return (
        <Pressable mt={2} onPress={() => { console.log("hello") }}>
            <Box borderWidth={active ? 1 : 0.5} p={3} borderColor={active ? 'blue.600' : 'gray.200'} borderRadius='md'>
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
            <Center p={2} borderStyle='dashed' borderRadius='md' borderWidth={1} borderColor='gray.300'>
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