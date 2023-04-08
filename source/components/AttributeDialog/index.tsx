import { Box, Button, Flex, InfoIcon, Input, Pressable, Stack, Text, Icon, Center, Modal, Radio, Toast } from "native-base"
import { useDisclosure } from "../../../hooks/useDisclosure"
import { Formik, FormikHelpers } from "formik";
import { MachineTypeAttribute } from "../../../models"
import * as Yup from 'yup';

interface Props {
    type: 'Add' | 'Update'
    InvokeAttributeComponent: ({ onPress }: { onPress: VoidFunction }) => JSX.Element
    onSubmit: (data: MachineTypeAttribute) => void;
    data?: MachineTypeAttribute
}

const validationSchema = Yup.object({
    name: Yup.string().required("Name of Required"),
    attributes: Yup.array(
        Yup.object({
            name: Yup.string().required("Name of Required"),
            type: Yup.string().oneOf(['TEXT', 'NUMBER', 'CHECKBOX', 'DATE']).required("Name of Required"),
        })
    ).min(1)
});

export const AttributeDialog = ({ type, InvokeAttributeComponent, onSubmit, data }: Props) => {
    const { isOpen, open, close } = useDisclosure()

    const handleSubmit = (attribute: MachineTypeAttribute, { setValues }: FormikHelpers<MachineTypeAttribute>) => {
        onSubmit(attribute)
        Toast.show({
            description: "Attributes Updated Successfully"
        })
        close()
        setValues({ name: '', type: 'TEXT' })
    }

    return (
        <>
            <InvokeAttributeComponent onPress={open} />
            <Formik
                initialValues={{ name: data?.name ?? '', type: data?.type ?? 'TEXT' }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                validateOnBlur={false}
                validateOnChange={false}
            >
                {
                    ({ values, handleSubmit, errors, handleChange, handleBlur, setValues }) => (
                        <Modal isOpen={isOpen} onClose={() => {
                            close()
                            setValues({ name: '', type: 'TEXT' })
                        }} size='md'>
                            <Modal.Content>
                                <Modal.CloseButton />
                                <Modal.Header>Attribute Manager</Modal.Header>
                                <Modal.Body>
                                    <Box>
                                        <Text mb={1}>Name *</Text>
                                        <Input size='lg' isInvalid={Boolean(errors.name)}
                                            onChangeText={handleChange('name')}
                                            onBlur={handleBlur('name')}
                                            value={values.name}
                                        />
                                        {
                                            errors.name ? <Text fontSize="xs" color='red.600'>Name of Required</Text> : null
                                        }
                                    </Box>

                                    <Box mt={5}>
                                        <Text mb={1}>Type *</Text>
                                        <Box>
                                            <Radio.Group value={values.type} onChange={handleChange('type')} name="attributeType" accessibilityLabel="select attribute type">
                                                <Radio size='sm' value="TEXT" my={1} >
                                                    Text
                                                </Radio>
                                                <Radio size='sm' value="NUMBER" my={1}>
                                                    Number
                                                </Radio>
                                                <Radio size='sm' value="DATE" my={1}>
                                                    Date
                                                </Radio>
                                                <Radio size='sm' value="CHECKBOX" my={1}>
                                                    Checkbox
                                                </Radio>
                                            </Radio.Group>
                                        </Box>
                                    </Box>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onPress={() => handleSubmit()} width='full'>
                                        {type}
                                    </Button>
                                </Modal.Footer>
                            </Modal.Content>
                        </Modal>
                    )
                }
            </Formik>
        </>
    )
}