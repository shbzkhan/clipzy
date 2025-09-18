import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { FC } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import ImageIcon from '../constants/ImageIcon'

interface Props {
    title:string
    handlePress:()=>void
    isLoading?:boolean
    containerStyles?:string
    textStyles?:string
    icon?:any
    widthAndHeight?:string
}

const CustomButton:FC<Props> = ({title, handlePress, isLoading, containerStyles, textStyles, icon, widthAndHeight = 6 }) => {
  return (
    <TouchableOpacity
    onPress={handlePress}
    activeOpacity={0.7}
    className={`bg-primary-500 rounded-xl min-h-[50px] flex-row w-100 justify-center items-center gap-4 ${containerStyles} `}
    disabled={isLoading}
    >
      {icon &&
      <Image
      source={icon}
      className={`w-${widthAndHeight} h-${widthAndHeight}`}
      resizeMode='contain'
      />
       }
      
        {isLoading?
        <ActivityIndicator
        size={"small"}
        color='white'
        />
        :
        <Text className={`font-rubik-medium  ${textStyles ?textStyles :"text-white"}`}>{title}</Text>}
    </TouchableOpacity>
  )
}

export default CustomButton