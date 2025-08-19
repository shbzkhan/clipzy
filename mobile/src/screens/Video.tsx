import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

interface videoDetailsProps{
  route:any
}
const VideoDetails:FC<videoDetailsProps> = ({route}) => {
const video = route.params
  console.log(video)
  return (
    <SafeAreaView className='flex-1'>
      <TouchableOpacity className='h-[200px]'
      activeOpacity={0.4}
      >
      <Image
              source={{uri:"https://lickd.co/wp-content/uploads/2022/11/Canva-YouTube-Thumbnail-creator.jpeg"}}
              className='w-full h-[200px]'
              resizeMode='cover'
              />
      </TouchableOpacity>
      <Text>{video.id}</Text>
    </SafeAreaView>
  )
}

export default VideoDetails