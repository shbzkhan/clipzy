import { View, Text, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { ActivityIndicator } from 'react-native-paper'

interface Props {
    title:string
    handlePress:()=>void
    isLoading?:boolean
    containerStyles?:string
    textStyles?:string
}

const CustomButton:FC<Props> = ({title, handlePress, isLoading, containerStyles, textStyles }) => {
  return (
    <TouchableOpacity
    onPress={handlePress}
    activeOpacity={0.7}
    className={`bg-primary-500 rounded-xl min-h-[50px] w-100 justify-center items-center ${containerStyles} `}
    disabled={isLoading}
    >
        {isLoading?
        <ActivityIndicator
        size={"small"}
        color='white'
        />
        :
        <Text className={`font-cormorantgaramond-medium text-xl  ${textStyles ?textStyles :"text-white"}`}>{title}</Text>}
    </TouchableOpacity>
  )
}

export default CustomButton