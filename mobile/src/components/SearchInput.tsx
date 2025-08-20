import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { FC, useState } from 'react'
import CustomIcon from './CustomIcon'

interface searchInputProps{
    query?:string
    handlePress:()=>void
    handleChange:()=>void
}

const SearchInput:FC<searchInputProps> = ({handleChange, handlePress, query}) => {
    // const [query, setQuery] = useState(initialQuery || '')
  return (
    <View className="border-1 border-gray-100 w-full h-12 px-4 bg-secondary  rounded-xl items-center flex-row space-x-4">
    <TextInput
    className="text-base font-psemibold mt-0.5 text-black-200 flex-1 "
    value={query}
    placeholder="Search for a video topic"
    placeholderTextColor="#9E9E9E"
    onChangeText={handleChange}
    
    />
      <CustomIcon 
      name="Search" 
      className='h-full w-14 bg-primary-600'
      color='white'
      handlePress={handlePress} />
      </View>
  )
}

export default SearchInput