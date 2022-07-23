import { createDrawerNavigator } from "@react-navigation/drawer";
import { HOME } from "../constants/screens";
import HomeStack from "./HomeStack";

const Draw = createDrawerNavigator();

const Navigator = () => {
    return (
        <Draw.Navigator screenOptions={{
            headerShown: false
        }}>
            <Draw.Screen name={HOME} component={HomeStack} />
        </Draw.Navigator>
    )
}

export default Navigator;