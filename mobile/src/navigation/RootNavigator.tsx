import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import About from '../screens/About';
import Splash from '../screens/Splash';
import { RootStackParamList } from '../types';
import { Appearance, StatusBar } from 'react-native';
import Search from '../screens/SearchHistory';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Video from '../screens/Video';
import Channel from '../screens/Channel';
import SearchVideo from '../screens/SearchVideo';
import { SheetProvider } from 'react-native-actions-sheet';
import { ToastProvider } from 'react-native-toast-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {useColorScheme} from "nativewind"
import { setTheme } from '../redux/slice/themeSlice';
import AppearanceToggle from '../screens/Appearance';
import WatchHistory from '../screens/WatchHistory';
import Playlist from '../screens/Playlist';
import YourVideo from '../screens/YourVideo';
import UserDetail from '../screens/UserDetail';
import Notification from '../screens/Notification';
import Download from '../screens/ChangePassword';
import PlaylistVideo from '../screens/PlaylistVideo';
import Post from '../screens/Post';
import UploadVideo from '../screens/UploadVideo';
import ChangePassword from '../screens/ChangePassword';
import ForgetPassword from '../screens/ForgetPassword';


const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
     const dispatch = useDispatch()
    const mode = useSelector((state: RootState)=>state.theme.mode)
    const [loaded,setLoaded] = useState(false)
    const { setColorScheme, colorScheme:colorSchemaD } = useColorScheme();

  const loadTheme = async () => {
    const savedTheme = (await AsyncStorage.getItem("themeMode")) as
      | "light"
      | "dark"
      | "system"
      | null;

    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    }
    setLoaded(true);
  };

  useEffect(() => {
    loadTheme();
  }, [dispatch]);

  // listen system theme changes
  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      if (mode === "system") {
        setColorScheme(colorScheme || "light");
      }
    });

    return () => listener.remove();
  }, [mode]);

  // apply theme when redux mode changes
  useEffect(() => {
    if (mode === "system") {
      const systemTheme = Appearance.getColorScheme() || "light";
      setColorScheme(systemTheme);
    } else {
      setColorScheme(mode);
    }
    AsyncStorage.setItem("themeMode", mode);
  }, [mode]);



   if(!loaded){
    return <Splash/>
  }
  return (
    <>
    <ToastProvider>
    <SheetProvider>
    <StatusBar barStyle={colorSchemaD === "dark" ? "light-content":"dark-content"} />
    <Stack.Navigator
    screenOptions={{headerShown:false}}
    initialRouteName='Splash'
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Posts" component={Post} />
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="SearchHistory" component={Search} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Video" component={Video} />
      <Stack.Screen name="Channel" component={Channel} />
      <Stack.Screen name="SearchVideo" component={SearchVideo} />
      <Stack.Screen name="Appearance" component={AppearanceToggle} />
      <Stack.Screen name="WatchHistory" component={WatchHistory} />
      <Stack.Screen name="Playlist" component={Playlist} />
      <Stack.Screen name="YourVideo" component={YourVideo} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="UserDetail" component={UserDetail} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="PlaylistVideo" component={PlaylistVideo} />
      <Stack.Screen name="UploadVideo" component={UploadVideo} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    </Stack.Navigator>
    </SheetProvider>
    </ToastProvider>
    </>
  )
}

export default RootNavigator