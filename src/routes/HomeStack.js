import { createStackNavigator } from "@react-navigation/stack";
import * as SCREENS from "../constants/screens";
import Home from "../screens/Home";
import FAQ from "../screens/FAQ";
import Notifications from "../screens/Notifications";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }} initialRouteName={SCREENS.NOTIFICATIONS_SCREEN}>
      <Stack.Screen name={SCREENS.HOME_SCREEN} component={Home} />
      <Stack.Screen name={SCREENS.FAQ_SCREEN} component={FAQ} />
      <Stack.Screen name={SCREENS.NOTIFICATIONS_SCREEN} component={Notifications} />
    </Stack.Navigator>
  )
}

export default HomeStack;