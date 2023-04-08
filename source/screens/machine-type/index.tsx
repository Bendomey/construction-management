import { AddIcon, Box, Button, Center, Fab, InfoIcon, ScrollView, Text, View } from "native-base"
import { SafeAreaView } from "react-native"
import { useDisclosure } from "../../../hooks/useDisclosure"
import { Machine } from "../../components/Machine"
import { RFValue } from "react-native-responsive-fontsize"
import { AddMachine } from "../../components/AddMachine"
import { useMachineTypesSelector } from "../../state/selectors"
import { useSelector } from "react-redux"
import { RootState } from "../../state"

interface Props {
    /** TODO: Type it */
    route: any
}

const machines = [1]
export const MachineType = ({ route }: Props) => {
    const addState = useDisclosure()

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                machines.length ? (
                    <ScrollView>
                        <Machine />
                        <Machine />
                        <Machine />
                    </ScrollView>
                ) : (
                    <Center style={{ flex: 1 }}>
                        <InfoIcon size='10' color='gray.300' />
                        <Box my={RFValue(10)}>
                            <Text color='gray.600' fontSize='lg'>No Machine Type Added</Text>
                        </Box>
                        <Button size='lg' onPress={addState.open}>
                            <Text color='white'> Add {route.params.machineType}</Text>
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
            <AddMachine close={addState.close} isOpen={addState.isOpen} />
        </SafeAreaView>
    )
}
