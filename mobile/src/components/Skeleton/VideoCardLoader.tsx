import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { FC } from 'react'


const VideoCardLoader= () => {
  return (
    <View className='gap-4'
    >
      <View className='relative'>
        <View className='w-full h-[200px] bg-secondary'></View>
        <View className='bg-black/50 absolute right-2 bottom-2 px-1 rounded-md'></View>
      </View>
      <View className='px-3 flex-row gap-2  items-center'>
        <View className='w-12 h-12 bg-secondary rounded-full'></View>
        <View className='flex-1 gap-2'>
            <View className='bg-secondary w-full h-4 rounded-full'></View>
            <View className='bg-secondary w-full h-4 rounded-full'></View>
            <View className='bg-secondary w-2/6 h-4 rounded-full'></View>
        </View>
        
      </View>
    </View>
  )
}

export default VideoCardLoader