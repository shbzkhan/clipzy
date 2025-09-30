/**
 * @format
 */

import { AppRegistry, Text, TextInput } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

if(Text.defaultProps){
  Text.defaultProps.allowFontScaling = false
}else{
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false
}

if(TextInput.defaultProps){
  TextInput.defaultProps.allowFontScaling = false
}else{
    TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false
}


AppRegistry.registerComponent(appName, () => App);
