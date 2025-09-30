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



export default function App() {


  useEffect(()=>{
    GoogleSignin.configure({
    webClientId:"800380995541-gqmnj3g4s3haa882h1091ecchol7cvio.apps.googleusercontent.com",
    forceCodeForRefreshToken:true,
    offlineAccess:false,
    iosClientId:"800380995541-dvld55rubos6boois8d5b4putqta2fe2.apps.googleusercontent.com"
  })

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