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
    <TouchableOpacity className={`px-3 py-1 border rounded-md items-center justify-center ${!isSubscribed ? "bg-primary-500 broder-primary-500":"border-primary-600 "} ${className}`}
    onPress={handlePress}
    >
        <Text className={`font-rubik-semibold text-white ${textStyle}`}>{isSubscribed? "Subscribed": "Subscribe"}</Text>
    </TouchableOpacity> 
  )
}

export default SubscribedButton