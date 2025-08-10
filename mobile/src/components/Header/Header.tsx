import { View, Text } from 'react-native'
import React from 'react'
import Logo from '../../constants/Logo'

const Header = () => {
  return (
    <View className=' h-14 w-full flex-row gap-1 items-center border-b px-4 border-gray-200'>
      <View className=' h-14 w-full flex-row gap-1 items-center border-b px-4 border-gray-200'>
      <Logo/>
      <Text className='text-primary-600 font-tinos-bold text-2xl'>CLIPZY</Text>\
      </View>
      <Text className='items-self-end'>Hello</Text>
    </View>
  )
}

export default Header