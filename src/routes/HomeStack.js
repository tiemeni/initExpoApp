import { createStackNavigator } from "@react-navigation/stack";
import { HOME } from "../constants/screens";
import Home from "../screens/Home";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name={HOME} component={Home} />
    </Stack.Navigator>
  )
}

export default HomeStack;