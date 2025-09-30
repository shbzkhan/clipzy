import {PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';

export const requestNotificationPermission = async()=>{
    if(Platform.OS === "android"){
        const gratedAndroid = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        if(gratedAndroid === PermissionsAndroid.RESULTS.GRANTED){
            FCMToken()
        }else{
            console.log("permissin denied")
        }
    }else{
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            FCMToken()
            console.log('Authorization status:', authStatus);
        }
    }
}

const FCMToken = async()=>{
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log("FCMToken===> ",token)
}