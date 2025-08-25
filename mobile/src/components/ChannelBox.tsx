import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import UserLogo from './UserLogo'

const ChannelBox = ({item}) => {
  return (
    <TouchableOpacity className='text-nowrap w-15 justify-center items-center gap-1'>
        <UserLogo
        uri={item.item.avatar}
        heightAndWidth={16}
        />
        <Text className='text-nowrap text-sm'>{`${item.item.fullname.slice(0,5)}..`}</Text>
        </TouchableOpacity>
  )
}

export default ChannelBox