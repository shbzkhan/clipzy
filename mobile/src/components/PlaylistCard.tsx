import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { FC } from 'react'
import { navigate } from '../navigation/NavigationUtils'


interface videoCardProps{
    // videoPress:()=>void
    _id:number
    title:string
    thumbnail:string
    fullname:string
    videos:string
}
const PlaylistCard:FC<videoCardProps> = ({_id, title, thumbnail, fullname, videos = 12 }) => {
  
  return (
    <TouchableOpacity className='flex-row gap-2'
    onPress={()=>navigate("PlaylistVideo",{id:_id})}
    >
    <View className='w-48 h-28 justify-center items-center relative rounded-xl overf'>
        <View className='w-44 h-full bg-primary-600 rounded-xl' />
        <View className='absolute top-1'>
      <Image
      source={{uri: thumbnail}}
      className='w-48 h-28 rounded-xl'
      resizeMode='cover'
      />
      </View>
      <View className='absolute top-1 bg-black/20 dark:bg-black/45 w-full h-full rounded-xl items-center justify-center'>
      <Text className='text-white font-rubik-bold text-xl'>{videos} videos</Text>
      </View>
      </View>
      <View className='flex-1'>
        <Text numberOfLines={3} className='font-rubik-semibold dark:text-white'>{title}</Text>
        <Text className='text-gray-600 font-rubik text-sm dark:text-gray-300'>by {fullname}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default PlaylistCard