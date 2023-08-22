import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import Navigator from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from './src/constants/colours';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import store from './src/redux/setups/store';
import { NativeBaseProvider } from 'native-base';
import { navigationRef } from './src/routes/rootNavigation';
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications'


enableScreens()

export default function App() {
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });
    return () => subscription.remove();
  }, [])

  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <SafeAreaView>
            <StatusBar backgroundColor={colors.primary} />
          </SafeAreaView>
          <Navigator />
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
};


