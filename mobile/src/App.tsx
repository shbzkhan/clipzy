import {WEB_CLIENT_ID, IOS_CLIENT_ID} from "./env"
import "react-native-gesture-handler"
import "../global.css"
import "./components/sheets/sheet"
import { Provider} from 'react-redux'
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigation/RootNavigator";
import { navigationRef } from "./navigation/NavigationUtils";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import { store } from "./redux/store";
import { useEffect } from "react";
import messaging from '@react-native-firebase/messaging';
import { requestNotificationPermission } from "./utils/notificationService";
import { Alert } from "react-native";
import Orientation from 'react-native-orientation-locker';



export default function App() {


  useEffect(()=>{
    GoogleSignin.configure({
    webClientId:WEB_CLIENT_ID,
    forceCodeForRefreshToken:true,
    offlineAccess:false,
    iosClientId:IOS_CLIENT_ID
  })

  //auto rotate off
   Orientation.lockToPortrait();

  //notifications
  requestNotificationPermission()
  },[])

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>   
      <NavigationContainer
      ref={navigationRef}>
        <RootNavigator/>
      </NavigationContainer>
    </Provider> 
  );
}