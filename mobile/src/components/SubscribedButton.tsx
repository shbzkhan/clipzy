import { Text, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'

interface SubscribeButtonProps {
    handlePress?:()=>void
    className?: string
    textStyle?:string
    isConnected?:boolean | false
}
const SubscribedButton:FC<SubscribeButtonProps> = ({handlePress, className, textStyle, isConnected}) => {
  return (
    <TouchableOpacity className={`px-3 py-1 rounded-md items-center justify-center border-primary-600 ${!isConnected && "bg-primary-500"} ${className}`}
    onPress={handlePress}
    >
        <Text className={`font-rubik-semibold ${isConnected?"text-primary-600":"text-white"} ${textStyle}`}>{isConnected? "Connected": "Connect"}</Text>
    </TouchableOpacity> 
  )
}

export default SubscribedButton