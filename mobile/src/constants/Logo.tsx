import { View, Text, Image } from 'react-native'
import React from 'react'

const Logo = () => {
  return (
    <View className='bg-primary-600 h-8 w-12 flex justify-center items-center rounded-lg'>
        <Image
          source={require("../assets/images/clipzylogo.png")}
          className="h-6 w-6"
          tintColor="#FFFFFF"
          resizeMode="center"
        />
      </View>
  )
}

export default Logo