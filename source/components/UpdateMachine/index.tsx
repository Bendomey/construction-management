import { Box, Button, Input, Text, Modal, Flex, Toast, Switch } from "native-base"
import { BlockTypes } from "../../../types";
import { InterfaceInputProps } from "native-base/lib/typescript/components/primitives/Input/types";
import { Machine, MachineType } from "../../../models";
import { Formik, FormikHelpers } from "formik";
import { useAppDispatch } from "../../state";
import { UPDATE_MACHINE_ACTION } from "../../state/slices/app.slice";
import { InterfaceSwitchProps } from "native-base/lib/typescript/components/primitives/Switch/types";

interface Props {
    isOpen: boolean
    close: VoidFunction
    machineType: MachineType
    data: Machine
    index: number
}

export const UpdateMachine = ({ isOpen, close, machineType, index, data }: Props) => {
    const dispatch = useAppDispatch()

    const handleSubmit = (values: Record<string, string | number | Date | boolean>, helpers: FormikHelpers<Record<string, string | number | Date | boolean>>) => {
        dispatch(
            UPDATE_MACHINE_ACTION({
                id: data.id,
                data: {
                    data: values,
                    id: data.id,
                    machineTypeId: data.machineTypeId
                }
            })
        )

        Toast.show({
            description: `${data[machineType.metaData.titleAttribute] ?? 'Machine'} has been updated successfully!`
        });

        close()
    }
    return (
        <Formik initialValues={data.data} onSubmit={handleSubmit}>
            {
                ({ values, handleChange, setFieldValue, handleReset, handleSubmit }) => {
                    return (
                        <Modal isOpen={isOpen} onClose={() => {
                            handleReset()
                            close()
                        }} size='xl'>
                            <Modal.Content h="xl">
                                <Modal.CloseButton />
                                <Modal.Header>Update Machine</Modal.Header>
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
                                                        value: values[attr.name] ? !Boolean(values[attr.name]) : false
                                                    }}

                                                />
                                            </Box>
                                        ))
                                    }
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onPress={() => handleSubmit()} width='full'>
                                        Update
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
}

const Field = ({ blockType, checkbox, input, checkBoxLabel }: FieldProps) => {
    switch (blockType) {
        case "CHECKBOX":
            return (
                <Flex flexDirection='row' alignItems='center'>
                    <Switch {...checkbox} />
                    <Text ml={2}>{checkBoxLabel}</Text>
                </Flex>
            )
        case "DATE":
        case "NUMBER":
            return <Input size='2xl' {...input} keyboardType="number-pad" />
        case "TEXT":
        default:
            return <Input size='2xl' {...input} />
    }
}