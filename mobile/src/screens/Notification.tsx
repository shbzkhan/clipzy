import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



const Notification =()=> {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-dark">
      <Text>No Notification Yet</Text>
      <Text>Wait for a notification</Text>
    </SafeAreaView>
  );
}


export default Notification