import React from 'react'
import * as SCREENS from "../constants/screens";
import FAQ from '../screens/FAQ';
import Notifications from '../screens/Notifications';
import Profile from '../screens/Profile';
import MonProfile2 from '../screens/MonProfile/index2';
import MakeAppointment from '../screens/MakeAppointment';
import { createStackNavigator } from '@react-navigation/stack';
import ContainerBottom from './ContainerBottom';
import Transaction from '../screens/Transactions'
import Payment from '../screens/Payment';
import Parametres from '../screens/Parametres';
import AboutUs from '../screens/AboutUs';
import AppointmentDetails from "../screens/AppointmentDetails";

const Stack = createStackNavigator();

const ContainerStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={SCREENS.ACCEUIL}
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name={SCREENS.ACCEUIL_CONTAINER} component={ContainerBottom} />
            <Stack.Screen name={SCREENS.FAQ_SCREEN} component={FAQ} />
            <Stack.Screen name={SCREENS.NOTIFICATIONS_SCREEN} component={Notifications} />
            <Stack.Screen name={SCREENS.PROFILE} component={Profile} />
            <Stack.Screen name={SCREENS.MON_PROFILE} component={MonProfile2} />
            <Stack.Screen
                options={{ animationEnabled: true}}
                name={SCREENS.MAKE_APPOINTMENT_SCREEN}
                component={MakeAppointment} />
            <Stack.Screen name={SCREENS.TrANSACTION} component={Transaction} />
            <Stack.Screen name={SCREENS.PAYMENT} component={Payment} />
            <Stack.Screen name={SCREENS.SETTINGS} component={Parametres} />
            <Stack.Screen name={SCREENS.ABOUT_US} component={AboutUs} />
            <Stack.Screen name={SCREENS.APPOINTMENT_DETAILS_SCREEN} component={AppointmentDetails} />
        </Stack.Navigator>
    )
}

export default ContainerStack;