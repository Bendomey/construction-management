import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MainDrawerItemsProps } from "../../types";
import { Dashboard, MachineTypesConfigurations, MachineType } from "../screens";


const Drawer = createDrawerNavigator<MainDrawerItemsProps>();

export const Navigator = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName='Configurations'>
                <Drawer.Screen name="Dashboard" component={Dashboard} />
                <Drawer.Screen 
                    name="MachineTypeOne" 
                    component={MachineType}
                    options={{
                        title:"Machine Type One"
                    }}
                    initialParams={{
                        machineType: "MachineTypeOne"
                    }}
                />
                <Drawer.Screen name="Configurations" component={MachineTypesConfigurations} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}