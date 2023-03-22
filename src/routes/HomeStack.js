import { createStackNavigator } from "@react-navigation/stack";
import * as SCREENS from "../constants/screens";
import Home from "../screens/Home";
import FAQ from "../screens/FAQ";
import PhoneConfirm from "../screens/PhoneConfirm";
import Notifications from "../screens/Notifications";
import Login from "../screens/Auth/Login";
import MakeAppointment from "../screens/MakeAppointment"
import Signup from "../screens/Auth/Signup";
import Profile from "../screens/Profile";
import MonProfile2 from "../screens/MonProfile/index2";
import MesRdv from "../screens/MesRdv";
import Transaction from "../screens/Transactions";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }} initialRouteName={SCREENS.HOME_SCREEN}>
      <Stack.Screen name={SCREENS.HOME_SCREEN} component={Home} />
      <Stack.Screen name={SCREENS.LOGIN} component={MonProfile2} />
      <Stack.Screen name={SCREENS.SIGNUP} component={Signup} />
      <Stack.Screen name={SCREENS.PHONE_CONFIRMATION_SCREEN} component={PhoneConfirm} />
    </Stack.Navigator>
  )
}

{/*  */}

export default HomeStack;