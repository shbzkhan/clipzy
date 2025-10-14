import notifee, { AndroidImportance } from '@notifee/react-native';
import {PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const requestNotificationPermission = async()=>{
    if(Platform.OS === "android"){
        const gratedAndroid = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        if(gratedAndroid === PermissionsAndroid.RESULTS.GRANTED){
            const fcmToken = await AsyncStorage.getItem("fcmToken");
            if(!fcmToken){
                FCMToken()

            }
        }else{
            console.log("permissin denied")
        }
    }else{
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            const fcmToken = await AsyncStorage.getItem("fcmToken");
            if(!fcmToken){
                FCMToken()
            }
            console.log('Authorization status:', authStatus);
        }
    }
    createNotificationChannel()
}

const FCMToken = async()=>{
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    await AsyncStorage.setItem("fcmToken", token)
}

const createNotificationChannel = async()=>{
    await notifee.createChannel({
        id:"default",
        name:"Default Channel",
        importance:AndroidImportance.HIGH,
    })
}