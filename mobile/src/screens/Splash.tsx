import { View, Text, Image, StatusBar } from 'react-native'
import React, { FC, useEffect } from 'react'
import { resetAndNavigate } from '../navigation/NavigationUtils';

const Splash:FC = () => {
    useEffect(()=>{
        const timeoutId = setTimeout(() => {
            resetAndNavigate("MainTabs")
        }, 1000)

        return ()=> clearTimeout(timeoutId)
    })
  return (
    <View className='bg-primary-600 h-full flex justify-center items-center'>
      <StatusBar barStyle={"light-content"} />
      <Image
      source={require("../assets/images/clipzylogo.png")}
      className='w-28 h-28'
      tintColor="white"
      />
    </View>
  )
}

export default Splash