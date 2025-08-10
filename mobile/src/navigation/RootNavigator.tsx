import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import About from '../screens/About';
import Splash from '../screens/Splash';
import { RootStackParamList } from '../types';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <>
    <StatusBar barStyle={"dark-content"} />
    <Stack.Navigator
    screenOptions={{headerShown:false}}
    initialRouteName='Splash'
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
    </>
  )
}

export default RootNavigator