import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import About from '../screens/About';
import Splash from '../screens/Splash';
import { RootStackParamList } from '../types';
import { StatusBar } from 'react-native';
import Search from '../screens/SearchHistory';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Video from '../screens/Video';
import Channel from '../screens/Channel';
import SearchVideo from '../screens/SearchVideo';
// import { SheetProvider } from 'react-native-actions-sheet';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <>
    {/* <SheetProvider> */}
    <StatusBar barStyle={"dark-content"} />
    <Stack.Navigator
    screenOptions={{headerShown:false}}
    initialRouteName='Splash'
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="SearchHistory" component={Search} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Video" component={Video} />
      <Stack.Screen name="Channel" component={Channel} />
      <Stack.Screen name="SearchVideo" component={SearchVideo} />
    </Stack.Navigator>
    {/* </SheetProvider> */}
    </>
  )
}

export default RootNavigator