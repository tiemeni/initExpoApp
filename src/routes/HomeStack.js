import { createStackNavigator } from "@react-navigation/stack";
import * as SCREENS from "../constants/screens";
import Home from "../screens/Home";
import FAQ from "../screens/FAQ";
import PhoneConfirm from "../screens/PhoneConfirm";
import Notifications from "../screens/Notifications";
import MakeAppointment from "../screens/MakeAppointment";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }} initialRouteName={SCREENS.MAKE_APPOINTMENT_SCREEN}>
      <Stack.Screen name={SCREENS.HOME_SCREEN} component={Home} />
      <Stack.Screen name={SCREENS.FAQ_SCREEN} component={FAQ} />
      <Stack.Screen name={SCREENS.NOTIFICATIONS_SCREEN} component={Notifications} />
      <Stack.Screen name={SCREENS.PHONE_CONFIRMATION_SCREEN} component={PhoneConfirm} />
      <Stack.Screen name={SCREENS.MAKE_APPOINTMENT_SCREEN} component={MakeAppointment} />
    </Stack.Navigator>
  )
}

export default HomeStack;