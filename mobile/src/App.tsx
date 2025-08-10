import "../global.css"
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigation/RootNavigator";
import { navigationRef } from "./navigation/NavigationUtils";




export default function App() {
  return (
      <NavigationContainer
      ref={navigationRef}
      >
        <RootNavigator/>
      </NavigationContainer>
  );
}