import "react-native-gesture-handler"
import "../global.css"
import "./components/sheets/sheet"
import { Provider } from 'react-redux'
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigation/RootNavigator";
import { navigationRef } from "./navigation/NavigationUtils";

import { store } from "./redux/store";



export default function App() {

  return (
    <Provider store={store}>   
      <NavigationContainer
      ref={navigationRef}>
        <RootNavigator/>
      </NavigationContainer>
    </Provider> 
  );
}