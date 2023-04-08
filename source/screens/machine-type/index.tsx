import { AddIcon, Box, Button, Center, Fab, InfoIcon, ScrollView, Text, View } from "native-base"
import { SafeAreaView } from "react-native"
import { useDisclosure } from "../../../hooks/useDisclosure"
import { Machine } from "../../components/Machine"
import { RFValue } from "react-native-responsive-fontsize"
import { AddMachine } from "../../components/AddMachine"
import { useMachineTypeSelector, useMachineTypesSelector, useMachinesSelector } from "../../state/selectors"
import { useSelector } from "react-redux"
import { RootState } from "../../state"

interface Props {
    /** TODO: Type it */
    route: any
}

export const MachineType = ({ route }: Props) => {
    const addState = useDisclosure()
    const machineType = useMachineTypeSelector(route.params.machineType)
    const machines = useMachinesSelector(route.params.machineType)

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                machines.length ? (
                    <ScrollView>
                        {
                            machines.map((machine, machineIdx) => (
                                <Machine data={machine} machineType={machineType} index={machineIdx} key={machine.id} />
                            ))
                        }
                    </ScrollView>
                ) : (
                    <Center style={{ flex: 1 }}>
                        <InfoIcon size='10' color='gray.300' />
                        <Box my={RFValue(10)}>
                            <Text color='gray.600' fontSize='lg'>No Machine Added</Text>
                        </Box>
                        <Button size='lg' onPress={addState.open}>
                            <Text color='white'> Add {machineType.name}</Text>
                        </Button>
                    </Center>
                )
            }
            {
                machines.length ? (
                    <Fab
                        placement="bottom-right"
                        size="lg"
                        onPress={addState.open}
                        icon={<AddIcon name="share" as="Entypo" />}
                        renderInPortal={false}
                        right={7} bottom={10}
                    />
                ) : null
            }
            <AddMachine machineType={machineType} close={addState.close} isOpen={addState.isOpen} />
        </SafeAreaView>
    )
}
