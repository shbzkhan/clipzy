import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import { Appearance, StatusBar } from 'react-native';
import { SheetProvider } from 'react-native-actions-sheet';
import { ToastProvider } from 'react-native-toast-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {useColorScheme} from "nativewind"
import { setTheme } from '../redux/slice/themeSlice';
import { allStack } from './ScreenCollection';
import GlobalUploader from '../components/GlobalUploader';


const Stack = createNativeStackNavigator();

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
      {
        allStack.map((item,index)=>(
          <Stack.Screen
          key={index}
          name={item.name}
          component={item.component}
          />
        ))
      }
    </Stack.Navigator>
      <GlobalUploader/>
    </SheetProvider>
    </ToastProvider>
    </>
  )
}

export default RootNavigator