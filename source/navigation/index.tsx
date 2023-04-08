import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MainDrawerItemsProps } from "../../types";
import { Dashboard, MachineTypesConfigurations, MachineType } from "../screens";
import { useMachineTypesSelector } from "../state/selectors";


const Drawer = createDrawerNavigator<MainDrawerItemsProps>();

export const Navigator = () => {
    const machineTypes = useMachineTypesSelector()
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName='Configurations'>
                <Drawer.Screen name="Dashboard" component={Dashboard} />
                {
                    machineTypes.map((machineType) => (
                        <Drawer.Screen
                            key={machineType.id}
                            name={machineType.slug}
                            component={MachineType}
                            options={{
                                title: machineType.name
                            }}
                            initialParams={{
                                machineType: machineType.id
                            }}
                        />
                    ))
                }
                <Drawer.Screen name="Configurations" component={MachineTypesConfigurations} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}