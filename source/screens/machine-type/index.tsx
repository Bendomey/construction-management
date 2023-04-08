import { AddIcon, Box, Button, Center, Fab, FlatList, InfoIcon, ScrollView, Text, View } from "native-base"
import { SafeAreaView } from "react-native"
import { useDisclosure } from "../../../hooks/useDisclosure"
import { Machine } from "../../components/Machine"
import { RFValue } from "react-native-responsive-fontsize"
import { AddMachine } from "../../components/AddMachine"
import { useMachineTypeSelector, useMachinesUnderMachineTypeSelector } from "../../state/selectors"
import { RouteProp } from "@react-navigation/native"
import { MainDrawerItemsProps } from "../../../types"

// Name is dynamic so we don't have to set it.
type MachineTypePageRouteProp = RouteProp<MainDrawerItemsProps>;

interface Props {
    route: MachineTypePageRouteProp
}

export const MachineType = ({ route }: Props) => {
    const addState = useDisclosure()
    
    const machineType = useMachineTypeSelector(route.params.machineType)
    const machines = useMachinesUnderMachineTypeSelector(route.params.machineType)

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                machines.length ? (
                    <FlatList
                        data={machines}
                        renderItem={({ item, index }) => <Machine data={item} machineType={machineType} index={index} />}
                        keyExtractor={item => item.id}
                    />
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
