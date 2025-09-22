import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { FC } from 'react'
import { navigate } from '../navigation/NavigationUtils'


interface videoCardProps{
    // videoPress:()=>void
    _id:number
    title:string
    thumbnail:string
    fullname:string
    views:string
}
const VideoListCard:FC<videoCardProps> = ({_id, title, thumbnail, fullname, views, time, date }) => {
  
  return (
    <TouchableOpacity className='flex-row gap-2'
    onPress={()=>navigate("Video",{id:_id})}
    >
      <Image
      source={{uri: thumbnail}}
      className='w-48 h-28 rounded-xl'
      resizeMode='cover'
      />
      <View className='flex-1'>
        <Text numberOfLines={3} className='font-rubik-semibold dark:text-white'>{title}</Text>
        <Text className='text-gray-600 font-rubik text-sm dark:text-gray-300'>{fullname}</Text>
        <Text className='text-gray-600 font-rubik text-sm dark:text-gray-300'>{views} Views</Text>
      </View>
    </TouchableOpacity>
  )
}

export default VideoListCard