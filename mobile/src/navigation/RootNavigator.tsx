import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import About from '../screens/About';
import Splash from '../screens/Splash';
import { RootStackParamList } from '../types';
import { StatusBar } from 'react-native';
import Search from '../screens/Search';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Video from '../screens/Video';
import Channel from '../screens/Channel';

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
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Video" component={Video} />
      <Stack.Screen name="Channel" component={Channel} />
    </Stack.Navigator>
    </>
  )
}

export default RootNavigator