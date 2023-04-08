import { Box, Button, Center, Flex, InfoIcon, SectionList, Text } from "native-base"
import { SafeAreaView } from "react-native"
import { useMachinesSelector } from "../../state/selectors"
import { RFValue } from "react-native-responsive-fontsize"
import { Machine } from "../../components/Machine"
import { AddMachine } from "../../components/AddMachine"
import { useDisclosure } from "../../../hooks/useDisclosure"
import { NavigationProp } from "@react-navigation/native"
import { MainDrawerItemsProps } from "../../../types"

type DashboardPageNavigationProp = NavigationProp<MainDrawerItemsProps, "Dashboard">;

interface Props {
    navigation: DashboardPageNavigationProp
}
export const Dashboard = ({ navigation }: Props) => {
    const machines = useMachinesSelector()
    const addState = useDisclosure()

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                machines.length ? (
                    <SectionList
                        sections={machines}
                        renderItem={({ index, item, section }) => (
                            <Machine data={item} machineType={section.type} index={index} />
                        )}
                        renderSectionHeader={({ section: { type } }) => (
                            <>
                                <Flex flexDirection='row' justifyContent='space-between' alignItems='center' mx={3} mt={5}>
                                    <Text fontWeight='bold' fontSize='2xl'>{type.name}</Text>
                                    <Button size='sm' onPress={addState.open}>
                                        Add Item
                                    </Button>
                                </Flex>
                                <AddMachine machineType={type} close={addState.close} isOpen={addState.isOpen} />
                            </>
                        )}
                        keyExtractor={item => item.id}
                    />
                ) : (
                    <Center style={{ flex: 1 }}>
                        <InfoIcon size='10' color='gray.300' />
                        <Box my={RFValue(10)}>
                            <Text color='gray.600' fontSize='lg'>No Machine Types Added</Text>
                        </Box>
                        <Button size='lg' onPress={() => navigation.navigate('Configurations')}>
                            <Text color='white'>Configure Machine Types</Text>
                        </Button>
                    </Center>
                )
            }
        </SafeAreaView>
    )
}