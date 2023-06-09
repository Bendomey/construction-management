import { Box, Button, Input, Text, Modal, Flex, Toast, Switch } from "native-base"
import { BlockTypes } from "../../../types";
import { InterfaceInputProps } from "native-base/lib/typescript/components/primitives/Input/types";
import { MachineType } from "../../../models";
import { Formik, FormikHelpers } from "formik";
import { useAppDispatch } from "../../state";
import { ADD_MACHINE_ACTION } from "../../state/slices/app.slice";
import { InterfaceSwitchProps } from "native-base/lib/typescript/components/primitives/Switch/types";
import { useMemo } from "react";
import DateTimePicker, { BaseProps } from '@react-native-community/datetimepicker';

interface Props {
    isOpen: boolean
    close: VoidFunction
    machineType: MachineType
}

export const AddMachine = ({ isOpen, close, machineType }: Props) => {
    const dispatch = useAppDispatch()

    const handleSubmit = (data: Record<string, string | number | Date | boolean>, helpers: FormikHelpers<Record<string, string | number | Date | boolean>>) => {
        dispatch(
            ADD_MACHINE_ACTION({
                machineTypeId: machineType.id,
                data: data
            })
        )
        Toast.show({
            description: `${data[machineType.metaData.titleAttribute] ?? 'Machine'} has been added successfully!`
        });
        helpers.resetForm()
        close()
    }

    const initValues = useMemo(() => {
        const data: Record<string, string | number | Date | boolean> = {}
        machineType.attributes.forEach(attr => {
            data[attr.name] = attr.type === 'CHECKBOX' ? false : attr.type === 'DATE' ? new Date() : attr.type === 'NUMBER' ? 0 : ''
        })
        return data
    }, [machineType.attributes])

    return (
        <Formik initialValues={initValues} onSubmit={handleSubmit}>
            {
                ({ values, handleChange, setFieldValue, handleReset, handleSubmit }) => {
                    return (
                        <Modal isOpen={isOpen} onClose={() => {
                            handleReset()
                            close()
                        }} size='xl'>
                            <Modal.Content h="xl">
                                <Modal.CloseButton />
                                <Modal.Header>Add New Machine</Modal.Header>
                                <Modal.Body>
                                    {
                                        machineType.attributes.map((attr, idx) => (
                                            <Box key={attr.name} mt={idx > 0 ? 3 : undefined}>
                                                {attr.type !== 'CHECKBOX' ? <Text mb={1}>{attr.name}</Text> : null}
                                                <Field blockType={attr.type} checkBoxLabel={attr.name}
                                                    input={{
                                                        value: values[attr.name] ? String(values[attr.name]) : '',
                                                        onChangeText: handleChange(attr.name)
                                                    }}
                                                    checkbox={{
                                                        onValueChange: (val) => setFieldValue(attr.name, val),
                                                        value: values[attr.name] ? Boolean(values[attr.name]) : false
                                                    }}
                                                    date={{
                                                        onChange: (e, date) => setFieldValue(attr.name, date),
                                                        value: values[attr.name] ? new Date(values[attr.name] as Date) : new Date()
                                                    }}

                                                />
                                            </Box>
                                        ))
                                    }
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

interface FieldProps {
    blockType: BlockTypes
    checkbox?: InterfaceSwitchProps
    checkBoxLabel?: string
    input?: InterfaceInputProps
    date?: BaseProps
}

const Field = ({ blockType, checkbox, input, checkBoxLabel, date }: FieldProps) => {
    switch (blockType) {
        case "CHECKBOX":
            return (
                <Flex flexDirection='row' alignItems='center'>
                    <Switch {...checkbox} />
                    <Text ml={2}>{checkBoxLabel}</Text>
                </Flex>
            )
        case "DATE":
            return <DateTimePicker {...date} display="spinner" />
        case "NUMBER":
            return <Input size='2xl' {...input} keyboardType="number-pad" />
        case "TEXT":
        default:
            return <Input size='2xl' {...input} />
    }
}