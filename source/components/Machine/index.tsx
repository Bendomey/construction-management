import { Box, Checkbox, Flex, Icon, IconButton, Input, Text } from "native-base"
import { BlockTypes } from "../../../types"
import Ionicons from '@expo/vector-icons/Ionicons';
import { DeleteMachineDialog } from "../DeleteMachineDialog";


export const Machine = () => {
    return (
        <Box background='white' mx={3} mt={3} p={4} borderRadius='md' borderWidth={1} borderColor='gray.200'>
            <Text fontWeight='bold' fontSize='lg'>Hello world</Text>
            <Box mt={2}>
                <Block type='CHECKBOX' isChecked />
            </Box>
            <Box mt={2}>
                <Block type='NUMBER' value="34" />
            </Box>
            <Box mt={2}>
                <Block type='TEXT' value="Hello world" />
            </Box>
            <Box mt={2}>
                <Block type='DATE' value="25th June, 2024" />
            </Box>

            <Flex alignItems='flex-end' mt={5}>
                <Flex flexDirection='row' alignItems='center' justifyContent='space-between'>
                    <IconButton variant='subtle' backgroundColor='blue.600' icon={<Icon as={Ionicons} name='create-outline' size='sm' color='white' />} />
                    <DeleteMachineDialog />
                </Flex>
            </Flex>
        </Box>
    )
}

interface BlockProps {
    type: BlockTypes
    value?: string
    isChecked?: boolean
}

const Block = ({ isChecked, value, type }: BlockProps) => {

    switch (type) {
        case "CHECKBOX":
            return <Checkbox isDisabled isChecked={isChecked} value='' color="green">Does it work?</Checkbox>

        case "DATE":
        case "TEXT":
        case "NUMBER":
        default:
            return <Input size='xl' value={value} _disabled={{ backgroundColor: 'gray.200' }} isDisabled />
    }
}