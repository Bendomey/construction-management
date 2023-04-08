import { Box, Checkbox, Flex, Icon, IconButton, Input, Text } from "native-base"
import { BlockTypes } from "../../../types"
import Ionicons from '@expo/vector-icons/Ionicons';
import { DeleteMachineDialog } from "../DeleteMachineDialog";
import { Machine as IMachine, MachineType } from "../../../models";

interface Props {
    data: IMachine
    machineType: MachineType
    index: number
}

export const Machine = ({ data, machineType, index }: Props) => {
    const title = data.data[machineType.metaData.titleAttribute] ? String(data.data[machineType.metaData.titleAttribute]) : 'N/A'
    return (
        <Box background='white' mx={3} mt={3} p={4} borderRadius='md' borderWidth={1} borderColor='gray.200'>
            <Text fontWeight='bold' fontSize='lg'>{title}</Text>
            {
                Object.entries(data.data).map(([key, value]) => {
                    const type = typeof value === 'string' ? 'TEXT' : typeof value === 'boolean' ? 'CHECKBOX' : 'DATE'
                    if (machineType.metaData.titleAttribute === key) {
                        return
                    }

                    return (
                        (
                            <Box key={key} mt={2}>
                                {type !== 'CHECKBOX' ? <Text>{key}</Text> : null}
                                <Block
                                    type={type}
                                    isChecked
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
                    <IconButton variant='subtle' backgroundColor='blue.600' icon={<Icon as={Ionicons} name='create-outline' size='sm' color='white' />} />
                    <DeleteMachineDialog id={data.id} title={title} />
                </Flex>
            </Flex>
        </Box>
    )
}

interface BlockProps {
    type: BlockTypes
    value?: string
    isChecked?: boolean
    checkboxLabel?: string
}

const Block = ({ isChecked, value, type, checkboxLabel }: BlockProps) => {

    switch (type) {
        case "CHECKBOX":
            return <Checkbox isDisabled isChecked={isChecked} value='' color="green">{checkboxLabel}</Checkbox>

        case "DATE":
        case "TEXT":
        case "NUMBER":
        default:
            return <Input size='xl' value={value} _disabled={{ backgroundColor: 'gray.200' }} isDisabled />
    }
}