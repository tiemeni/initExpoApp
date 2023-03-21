import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "native-base";
import * as SCREENS from "../constants/screens";
import ContainerBottom from "./ContainerBottom";
import ContainerStack from "./ContainerStack";
import HomeStack from "./HomeStack";

const Stack = createStackNavigator();

const Navigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name={SCREENS.HOME_ROUTE} component={HomeStack} />
            <Stack.Screen name={SCREENS.HOME_CONTAINER_ROUTE} component={ContainerStack} />
        </Stack.Navigator>
    )
}

export default Navigator;