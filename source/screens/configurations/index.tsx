import { AddIcon, Box, Button, Center, Fab, InfoIcon, Text } from "native-base"
import { RFValue } from "react-native-responsive-fontsize"
import { useDisclosure } from "../../../hooks/useDisclosure"
import { AddMachineType } from "../../components/AddMachineType"


const machineTypes = [1]
export const MachineTypesConfigurations = () => {
    const addState = useDisclosure()

    return (
        <>
            <Box style={{ flex: 1, position: 'relative' }}>
                <Center style={{ flex: 1 }}>
                    <InfoIcon size='10' color='gray.300' />
                    <Box my={RFValue(10)}>
                        <Text color='gray.600' fontSize='lg'>No Machine Type Added</Text>
                    </Box>
                    <Button size='lg' onPress={addState.open}>
                        Add Machine Type
                    </Button>
                </Center>
                {
                    machineTypes.length ? (
                        <Fab
                            placement="bottom-right"
                            size="lg"
                            onPress={addState.open}
                            icon={<AddIcon name="share" as="Entypo" />}
                        />
                    ) : null
                }
            </Box>
            <AddMachineType close={addState.close} isOpen={addState.isOpen} />
        </>
    )
}