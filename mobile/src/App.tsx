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
import notifee, { AndroidImportance, AndroidStyle, EventType } from '@notifee/react-native';



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
  
  //notificatin service
  const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      const {title, body, imageUrl} = remoteMessage.data;
      await notifee.displayNotification({
        title,
        body,
        android:{
          channelId:"default",
          importance: AndroidImportance.HIGH,
          pressAction:{id:"default"},
          style:imageUrl?{type:AndroidStyle.BIGPICTURE, picture:imageUrl}: undefined
        }
      })
    });

    messaging().setBackgroundMessageHandler(async remoteMessage =>{
      Alert.alert('A new FCM message backround!', JSON.stringify(remoteMessage));
      const {title, body, imageUrl} = remoteMessage.data;
      await notifee.displayNotification({
        title,
        body,
        android:{
          channelId:"default",
          importance: AndroidImportance.HIGH,
          pressAction:{id:"default"},
          style:imageUrl?{type:AndroidStyle.BIGPICTURE, picture:imageUrl}: undefined
        }
      })
    });

    notifee.onBackgroundEvent(async ({ type, detail }) => {
      // console.log("Notifee background event:", type, detail);
        
      if (type === EventType.PRESS) {
        console.log("Notification pressed in background", detail.notification);
      }
    });

    return() =>{
      unsubscribe();
    }
      
  },[])


  return (
    <Provider store={store}>   
      <NavigationContainer
      ref={navigationRef}>
        <RootNavigator/>
      </NavigationContainer>
    </Provider> 
  );
}