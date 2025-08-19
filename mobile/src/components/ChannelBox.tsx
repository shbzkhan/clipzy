import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const ChannelBox = ({item}) => {
  return (
    <TouchableOpacity className='text-nowrap w-15 justify-center items-center gap-1'>
        <View>
            <Image
                source={{uri:item.item.avatar}}
                className='w-14 h-14 rounded-full'
                resizeMode='cover'
                /> 
        </View>
        <Text className='text-nowrap text-sm'>{`${item.item.fullname.slice(0,5)}..`}</Text>
        </TouchableOpacity>
  )
}

export default ChannelBox