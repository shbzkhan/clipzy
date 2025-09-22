import { View} from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'

const GlobalLoader = () => {
  return (
    <View className='flex-1 justify-center items-center bg-white dark:bg-dark'>
      <ActivityIndicator color="#2563EB" size="large"/>
    </View>
  )
}

export default GlobalLoader