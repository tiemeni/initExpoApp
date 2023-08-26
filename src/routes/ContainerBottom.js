import Acceuil from "../screens/Acceuil";
import * as SCREENS from "../constants/screens";
import Notifications from "../screens/Notifications";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MesRdv from "../screens/MesRdv/";
import Ionic from "react-native-vector-icons/Ionicons"
import colors from "../constants/colours";
import { Home, Notification, FolderOpen } from 'iconsax-react-native';
import { Button, HStack, Pressable, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";


const Bottom = createBottomTabNavigator();

const setScreenOption = ({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused }) => {
        if (route.name === SCREENS.ACCEUIL)
            return <Home color={focused ? colors.primary : "#706e6e"} />
        if (route.name === SCREENS.RDV)
            return <FolderOpen color={focused ? colors.primary : "#706e6e"} />
        if (route.name === SCREENS.NOTIFICATIONS)
            return <Notification color={focused ? colors.primary : "#706e6e"} />
    },
    tabBarStyle: {
        backgroundColor: colors.bg_grey,
        marginBottom: 5,
    },
    tabBarLabelStyle: {
        fontSize: 14,
    },
    tabBarShowLabel: true,
    tabBarInactiveTintColor: "#706e6e",
    tabBarActiveTintColor: colors.primary,
})

const ContainerBottom = () => {
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