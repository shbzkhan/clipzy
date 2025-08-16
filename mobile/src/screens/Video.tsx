import { View, Text } from 'react-native'
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
      <Text>{video.id}</Text>
    </SafeAreaView>
  )
}

export default VideoDetails