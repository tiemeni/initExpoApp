import { createDrawerNavigator } from "@react-navigation/drawer";
import * as SCREENS from "../constants/screens";
import HomeStack from "./HomeStack";

const Draw = createDrawerNavigator();

const Navigator = () => {
    return (
        <Draw.Navigator screenOptions={{
            headerShown: false
        }}>
            <Draw.Screen name={SCREENS.HOME_ROUTE} component={HomeStack} />
        </Draw.Navigator>
    )
}

export default Navigator;