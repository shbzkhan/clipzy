import { View, Text, Image } from 'react-native'
import React from 'react'

interface logoProps {
  containerStyle?:string
  imageStyle?:string
}

const Logo = ({containerStyle, imageStyle}:logoProps) => {
  return (
    <View className={`bg-primary-600 h-8 w-12 flex justify-center items-center rounded-lg ${containerStyle}`}>
      <Image
        source={require("../assets/images/clipzylogo.png")}
        className={`h-6 w-6 ${imageStyle}`}
        tintColor="#FFFFFF"
        resizeMode="center"
      />
      </View>
  )
}

export default Logo