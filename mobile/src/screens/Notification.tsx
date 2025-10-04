import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



const Notification =()=> {
  return (
    <View className="flex-1 bg-white dark:bg-dark justify-center items-center">
      <Text className="dark:text-white font-rubik-bold text-2xl">No Notification Yet</Text>
      <Text className="text-gray-400 dark:text-white font-rubik">Wait for a notification</Text>
    </View>
  );
}


export default Notification