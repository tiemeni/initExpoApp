import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import Navigator from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors, { PRIMARY_BLUE } from './src/constants/colours';
import { enableScreens } from 'react-native-screens';
import { DANGER_ZONE_HEIGHT } from './src/constants/size';
import { Provider } from 'react-redux';
import store from './src/redux/setups/store';
import { NativeBaseProvider } from 'native-base';
import FAQ from './src/screens/FAQ';

enableScreens()

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <SafeAreaView>
          <StatusBar backgroundColor={colors.primary} />
        </SafeAreaView>
        <Provider store={store}>
          <Navigator />
        </Provider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};


