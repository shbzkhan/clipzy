import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { FC } from 'react'
import { navigate } from '../navigation/NavigationUtils'


interface videoCardProps{
    _id:number
    title:string
    thumbnail:string
     owner:{
      fullname:string
    }
    views:string
}
interface watchHistoryProps{
  watchData:videoCardProps
}
const VideoListCard:FC<watchHistoryProps> = ({watchData }) => {
  return (
    <TouchableOpacity className='flex-row gap-2'
    onPress={()=>navigate("Video",{id:watchData._id})}
    >
      <Image
      source={{uri: watchData.thumbnail}}
      className='w-48 h-28 rounded-xl'
      resizeMode='cover'
      />
      <View className='flex-1'>
        <Text numberOfLines={3} className='font-rubik-semibold dark:text-white'>{watchData.title}</Text>
        <Text className='text-gray-600 font-rubik text-sm dark:text-gray-300'>{watchData.owner.fullname}</Text>
        <Text className='text-gray-600 font-rubik text-sm dark:text-gray-300'>{watchData.views} Views</Text>
      </View>
    </TouchableOpacity>
  )
}

export default VideoListCard