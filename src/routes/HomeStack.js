import { createStackNavigator } from "@react-navigation/stack";
import * as SCREENS from "../constants/screens";
import Home from "../screens/Home";
import PhoneConfirm from "../screens/PhoneConfirm";
import Login from "../screens/Auth/Login";
import Signup from "../screens/Auth/Signup";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }} initialRouteName={SCREENS.HOME_SCREEN}>
      <Stack.Screen name={SCREENS.HOME_SCREEN} component={Home} />
      <Stack.Screen name={SCREENS.LOGIN} component={Login} />
      <Stack.Screen name={SCREENS.SIGNUP} component={Signup} />
      <Stack.Screen name={SCREENS.PHONE_CONFIRMATION_SCREEN} component={PhoneConfirm} />
    </Stack.Navigator>
  )
}

export default HomeStack;