import { Text, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'

interface SubscribeButtonProps {
    handlePress?:()=>void
    className?: string
    textStyle?:string
    isSubscribed?:boolean | false
}
const SubscribedButton:FC<SubscribeButtonProps> = ({handlePress, className, textStyle, isSubscribed}) => {
  return (
    <TouchableOpacity className={`px-2 py-1 bg-primary-600 border border-primary-600 rounded-md items-center justify-center ${className}`}
    onPress={handlePress}
    >
        <Text className={`font-rubik-semibold text-white ${textStyle}`}>{isSubscribed? "Subscribed": "Subscribe"}</Text>
    </TouchableOpacity> 
  )
}

export default SubscribedButton