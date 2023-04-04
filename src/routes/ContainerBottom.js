import Acceuil from "../screens/Acceuil";
import * as SCREENS from "../constants/screens";
import Notifications from "../screens/Notifications";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MesRdv from "../screens/MesRdv";
import Ionic from "react-native-vector-icons/Ionicons"
import colors from "../constants/colours";


const Bottom = createBottomTabNavigator();

const ContainerBottom = () => {
    const setScreenOption = ({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, size }) => {
            let iconName
            if (route.name === SCREENS.ACCEUIL) {
                iconName = focused ? 'ios-home' : 'ios-home-outline'
            } else if (route.name === SCREENS.RDV) {
                iconName = focused ? "ios-document-text" : "ios-document-text-outline"
            } else if (route.name === SCREENS.NOTIFICATIONS) {
                iconName = focused ? 'notifications' : 'notifications-outline'
            }
            return <Ionic
                name={iconName}
                size={size}
                style={{
                    marginBottom: -6
                }}
                color={focused ? colors.primary : "#706e6e"}
            />
        },
        tabBarStyle: {
            // paddinTop: 3,
            // display: route.name === SCREENS.MAKE_APPOINTMENT_SCREEN ? 'none' : 'flex'
        },
        tabBarLabelStyle: {
            fontSize: 12,
            // marginBottom: 4
        },
        tabBarShowLabel: true,
        tabBarInactiveTintColor: "#706e6e",
        tabBarActiveTintColor: colors.primary,
    })

    return (
        <Bottom.Navigator
            initialRouteName={SCREENS.ACCEUIL}
            screenOptions={setScreenOption}
        >
            <Bottom.Screen name={SCREENS.ACCEUIL} component={Acceuil} />
            <Bottom.Screen name={SCREENS.RDV} component={MesRdv} />
            <Bottom.Screen name={SCREENS.NOTIFICATIONS} component={Notifications} />
        </Bottom.Navigator>
    )
}

export default ContainerBottom;