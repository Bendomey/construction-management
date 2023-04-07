import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MainDrawerItemsProps } from "../../types";
import { MachineTypesConfigurations } from "../screens";


const Drawer = createDrawerNavigator<MainDrawerItemsProps>();

export const Navigator = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName='Configurations'>
                <Drawer.Screen name="Configurations" component={MachineTypesConfigurations} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}