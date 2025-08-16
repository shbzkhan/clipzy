import "../global.css"
import { Provider } from 'react-redux'
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigation/RootNavigator";
import { navigationRef } from "./navigation/NavigationUtils";
import { ToastProvider } from 'react-native-toast-notifications'
import { store } from "./redux/store";




export default function App() {
  return (
    <Provider store={store}>   
    <ToastProvider>
      <NavigationContainer
      ref={navigationRef}>
        <RootNavigator/>
      </NavigationContainer>
      </ToastProvider>
    </Provider> 
  );
}