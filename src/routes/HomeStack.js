import { createStackNavigator } from "@react-navigation/stack";
import * as SCREENS from "../constants/screens";
import Home from "../screens/Home";
import FAQ from "../screens/FAQ";
import PhoneConfirm from "../screens/PhoneConfirm";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }} initialRouteName={SCREENS.NOTIFICATIONS_SCREEN}>
      <Stack.Screen name={SCREENS.HOME_SCREEN} component={FAQ} />
      <Stack.Screen name={SCREENS.FAQ_SCREEN} component={PhoneConfirm} />
      <Stack.Screen name={SCREENS.NOTIFICATIONS_SCREEN} component={Home} />
    </Stack.Navigator>
  )
}

export default HomeStack;