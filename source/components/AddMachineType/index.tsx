import { Box, Button, InfoIcon, Input, Pressable, Text, Center, Modal, Flex, IconButton, Icon, Badge, Toast } from "native-base"
import { AttributeDialog } from "../AttributeDialog"
import Ionicons from '@expo/vector-icons/Ionicons';
import { DeleteAttributeDialog } from "../DeleteAttributeDialog";
import * as Yup from 'yup';
import { Formik, FormikHelpers } from "formik";
import { BlockTypes } from "../../../types";
import { useAppDispatch } from "../../state";
import { SAVE_NEW_MACHINE_TYPE_ACTION } from "../../state/slices/app.slice";
import _ from 'lodash'
import { MachineTypeAttribute } from "../../../models";
import update from 'immutability-helper'

interface Props {
    isOpen: boolean
    close: VoidFunction
}

interface AttributesDataProps {
    name: string;
    type: BlockTypes
    isTitleAttribute: boolean
}

interface FormFieldsParams {
    name: string;
    attributes: Array<AttributesDataProps>
}

const validationSchema = Yup.object({
    name: Yup.string().required("Name of Required"),
    attributes: Yup.array(
        Yup.object({
            name: Yup.string().required("Name of Required"),
            type: Yup.string().oneOf(['TEXT', 'NUMBER', 'CHECKBOX', 'DATE']).required("Name of Required"),
            isTitleAttribute: Yup.boolean(),
        })
    ).min(1, "At least one attribute is required")
});

export const AddMachineType = ({ isOpen, close }: Props) => {
    const dispatch = useAppDispatch()

    const handleSubmit = (values: FormFieldsParams, helpers: FormikHelpers<FormFieldsParams>) => {
        const findAttributeWithTitleConfigured = values.attributes.find(attribute => Boolean(attribute.isTitleAttribute))
        const titleAttribute = findAttributeWithTitleConfigured ? findAttributeWithTitleConfigured.name : values.attributes[0].name

        dispatch(SAVE_NEW_MACHINE_TYPE_ACTION({
            name: values.name,
            slug: _.camelCase(values.name),
            attributes: values.attributes,
            metaData: {
                titleAttribute
            }
        }));
        Toast.show({
            description: `${values.name} has been added.`
        })
        close()
        helpers.resetForm()
    }

    return (
        <Formik
            initialValues={{ name: '', attributes: [] }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            validateOnBlur={false}
            validateOnChange={false}
        >
            {
                ({ handleChange, handleBlur, handleSubmit, values, errors, handleReset, setFieldValue }) => {
                    const addnewAttribute = (newAttribute) => {
                        setFieldValue('attributes', [...values.attributes, {
                            ...newAttribute,
                            isTitleAttribute: values.attributes.length === 0
                        }])
                    }

                    const removeAttribute = async (index: number) => {
                        let attributes = update(values.attributes, { $splice: [[index, 1]] })
                        if (attributes.length) {
                            attributes = update(attributes, {
                                0: {
                                    $set: {
                                        ...attributes[0],
                                        isTitleAttribute: true,
                                    }
                                }
                            })
                        }
                        setFieldValue('attributes', attributes)
                    }

                    const updateAttribute = (index: number, attribute: AttributesDataProps) => setFieldValue("attributes", update(values.attributes, { [index]: { $set: attribute } }))
                    return (
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
                                        errors.name ? <Text fontSize="xs" color='red.600'>{errors.name as string}</Text> : null
                                    }
                                    <Box mt={5}>
                                        <Text mb={1} color='gray.400'>ATTRIBUTES</Text>
                                        {
                                            errors.attributes ? <Text fontSize="xs" color='red.600'>{errors.attributes as string}</Text> : null
                                        }
                                        {
                                            values.attributes.length ? (
                                                <>
                                                    <AttributeDialog onSubmit={addnewAttribute} type='Add' InvokeAttributeComponent={({ onPress }) => (
                                                        <AddNewAttribute onPress={onPress} />
                                                    )} />
                                                    <Text mt={4} fontSize='xs' color='gray.400'>NB: Click on an attribute to make it the title attribute.</Text>
                                                    {
                                                        values.attributes.map((attribute, attributeIdx) => <Attribute onPress={() => {
                                                            setFieldValue('attributes', values.attributes.map((attr, attrIndex) => attrIndex === attributeIdx ? ({ ...attr, isTitleAttribute: true }) : ({ ...attr, isTitleAttribute: false })))
                                                        }} onRemove={() => removeAttribute(attributeIdx)} onUpdate={(values) => updateAttribute(attributeIdx, values)} key={attributeIdx} active={attribute.isTitleAttribute} data={attribute} />)
                                                    }
                                                </>
                                            ) : <NoAttributesAdded onSubmit={addnewAttribute} />
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
            }
        </Formik>
    )
}

interface AttributeProps {
    active?: boolean
    data: AttributesDataProps
    onRemove: VoidFunction
    onPress: VoidFunction
    onUpdate: (values: AttributesDataProps) => void
}

const Attribute = ({ active = false, data, onRemove, onUpdate, onPress }: AttributeProps) => {
    return (
        <Pressable mt={2} onPress={onPress}>
            <Box borderWidth={active ? 1 : 0.5} p={3} borderColor={active ? 'blue.600' : 'gray.200'} borderRadius='md'>
                <Flex flexDirection='row' alignItems='flex-start' justifyContent='space-between'>
                    <Box display='flex' alignItems='flex-start' width='70%'>
                        <Text fontWeight='bold'>{data.name}</Text>
                        <Badge colorScheme="blue" mt={2}>{_.startCase(data.type)}</Badge>
                    </Box>
                    <Flex flexDirection='row' alignItems='center' justifyContent='space-between'>
                        <AttributeDialog onSubmit={(val) => onUpdate({
                            ...val,
                            isTitleAttribute: data.isTitleAttribute
                        })}
                            data={data}
                            type='Update' InvokeAttributeComponent={({ onPress }) => (
                                <IconButton onPress={onPress} icon={<Icon as={Ionicons} name='create-outline' />} />
                            )} />
                        <DeleteAttributeDialog data={data} onPress={onRemove} />
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

interface NoAttributesAddedProps {
    onSubmit: (data: MachineTypeAttribute) => void;
}

const NoAttributesAdded = ({ onSubmit }: NoAttributesAddedProps) => {
    return (
        <Center py='5'>
            <InfoIcon size='5' />
            <Text color='gray.400' mt='2'>No Attributes added</Text>
            <AttributeDialog onSubmit={onSubmit} type='Add' InvokeAttributeComponent={({ onPress }) => (
                <Button mt='2' onPress={onPress}>
                    Add Attribute
                </Button>
            )} />
        </Center>
    )
}