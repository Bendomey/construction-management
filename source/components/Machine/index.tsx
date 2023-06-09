import { Box, Checkbox, Flex, Icon, IconButton, Input, Text } from "native-base"
import { BlockTypes } from "../../../types"
import Ionicons from '@expo/vector-icons/Ionicons';
import { DeleteMachineDialog } from "../DeleteMachineDialog";
import { Machine as IMachine, MachineType } from "../../../models";
import { useDisclosure } from "../../../hooks/useDisclosure";
import { UpdateMachine } from "../UpdateMachine";
import { isDate } from "lodash";

interface Props {
    data: IMachine
    machineType: MachineType
    index: number
}

export const Machine = ({ data, machineType, index }: Props) => {
    const updateState = useDisclosure()
    const title = data.data[machineType.metaData.titleAttribute] ? String(data.data[machineType.metaData.titleAttribute]) : 'N/A'
    return (
        <>
            <Box background='white' mx={3} mt={3} p={4} borderRadius='md' borderWidth={1} borderColor='gray.200'>
                <Text fontWeight='bold' fontSize='lg'>{title}</Text>
                {
                    Object.entries(data.data).map(([key, value]) => {
                        const type = isDate(value) ? 'DATE' : typeof value === 'boolean' ? 'CHECKBOX' : 'TEXT'
                        if (machineType.metaData.titleAttribute === key) {
                            return;
                        }

                        return (
                            (
                                <Box key={key} mt={2}>
                                    {type !== 'CHECKBOX' ? <Text>{key}</Text> : null}
                                    <Block
                                        type={type}
                                        isChecked={Boolean(value)}
                                        value={String(value)}
                                        checkboxLabel={type === 'CHECKBOX' ? key : undefined}
                                    />
                                </Box>
                            )
                        )
                    })
                }

                <Flex alignItems='flex-end' mt={5}>
                    <Flex flexDirection='row' alignItems='center' justifyContent='space-between'>
                        <IconButton onPress={updateState.open} variant='subtle' backgroundColor='blue.600' icon={<Icon as={Ionicons} name='create-outline' size='sm' color='white' />} />
                        <DeleteMachineDialog id={data.id} title={title} />
                    </Flex>
                </Flex>
            </Box>
            <UpdateMachine close={updateState.close} data={data} index={index} isOpen={updateState.isOpen} machineType={machineType} />
        </>

    )
}

interface BlockProps {
    type: BlockTypes
    value?: string
    isChecked?: boolean
    checkboxLabel?: string
}

const Block = ({ isChecked, value, type, checkboxLabel }: BlockProps) => {
    console.log(value, new Date(value).toDateString(), "hello")
    switch (type) {
        case "CHECKBOX":
            return <Checkbox isDisabled isChecked={isChecked} value='' color="green">{checkboxLabel}</Checkbox>

        case "DATE":
            return <Input size='xl' value={new Date(value).toDateString()} _disabled={{ backgroundColor: 'gray.200' }} isDisabled />
        case "TEXT":
        case "NUMBER":
        default:
            return <Input size='xl' value={value} _disabled={{ backgroundColor: 'gray.200' }} isDisabled />
    }
}