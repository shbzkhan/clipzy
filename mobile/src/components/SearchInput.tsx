import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { FC, useState } from 'react'
import CustomIcon from './CustomIcon'
import Icon from '../constants/Icons'

interface searchInputProps{
    value?:string
    PressX?:()=>void
}

const SearchInput:FC<searchInputProps> = ({value, PressX, ...props}) => {
  return (
    <View className=" flex-1 border-1 border-gray-100 w-full h-11 px-4  bg-secondary  rounded-xl items-center flex-row space-x-4 dark:bg-dark-100">
    <TextInput
    className="text-base font-psemibold text-black-200 flex-1 dark:text-white"
    placeholder="Search for a video topic"
    placeholderTextColor="#9E9E9E"
    returnKeyType='search'
    textAlignVertical='center'
    value={value}
    editable
    {...props}
    
    />
    {
      (value?.trim()!== "") && (
        <TouchableOpacity onPress={PressX}>
          <Icon name='X'/>
        </TouchableOpacity>
      )
    }
      </View>
  )
}

export default SearchInput