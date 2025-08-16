import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { FC } from 'react'
import Icon from '../constants/Icons'
import { navigate } from '../navigation/NavigationUtils'


interface videoCardProps{
    // videoPress:()=>void
    _id:number
    title:string
    thumbnail:string
    avatar:string
    fullname:string
    views:string
    date:string
    time:string
}
const VideoCard:FC<videoCardProps> = ({_id, title, thumbnail, avatar, fullname, views, time, date }) => {
  return (
    <TouchableOpacity className='gap-4'
     onPress={()=>navigate("Video",{id:_id})}
    >
      <View className='relative'>
        <Image
        source={{uri:thumbnail}}
        className='w-full h-[200px]'
        resizeMode='cover'
        />
        <View className='bg-black/50 absolute right-2 bottom-2 px-1 rounded-md'>
            <Text className='text-white '>{time}</Text>
        </View>
      </View>
      <View className='px-3 flex-row gap-2  items-center'>
        <TouchableOpacity className='w-12 h-12 rounded-full'
        onPress={()=>navigate("Channel")}
        >
           <Image
        source={{uri:avatar}}
        className='w-12 h-12 rounded-full'
        resizeMode='cover'
        /> 
        </TouchableOpacity>
        <View className='flex-1'>
            <Text className='text-black font-bold ' numberOfLines={2}>{title}</Text>
            <Text className='text-gray-600 text-xs'>{`${fullname} . ${views} views . ${date} days ago`}</Text>
        </View>
        <TouchableOpacity>
            <Icon name='EllipsisVertical' color='black'/>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default VideoCard