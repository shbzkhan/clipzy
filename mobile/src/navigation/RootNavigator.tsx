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
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="SearchHistory" component={Search} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Video" component={Video} />
      <Stack.Screen name="Channel" component={Channel} />
      <Stack.Screen name="SearchVideo" component={SearchVideo} />
      <Stack.Screen name="Appearance" component={AppearanceToggle} />
    </Stack.Navigator>
    </SheetProvider>
    </ToastProvider>
    </>
  )
}

export default RootNavigator