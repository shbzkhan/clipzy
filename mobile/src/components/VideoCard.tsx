import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { FC, useState } from 'react'
import Icon from '../constants/Icons'
import { navigate } from '../navigation/NavigationUtils'
import UserLogo from './UserLogo'
import { useColorScheme } from 'nativewind'
import { format } from '../constants/TimeFormat'
import { Owner } from '../types/video'
import{ createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient'
import { timeAgo } from '../constants/TimeAgo'


interface videoCardProps{
    // videoPress:()=>void
    _id:number
    title:string
    thumbnail:string
    avatar:string
    fullname:string
    views:string
    duration:string
    createdAt:string
    owner:Owner
}
const VideoCard:FC<videoCardProps> = ({_id, title, thumbnail, views, duration, createdAt, owner }) => {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
   const { colorScheme} = useColorScheme();
   const[thumbLoading, setThumbLoading]=useState(true)
  return (
    <TouchableOpacity className='gap-4'
     onPress={()=>navigate("Video",{id:_id})}
    >
      <View className='relative'>
        {thumbLoading && (
        <View className="absolute inset-0 bg-secondary">
          <ShimmerPlaceholder style={{ flex: 1, width: "100%" }} />
        </View>
        )}
        <Image
        source={{uri:thumbnail}}
        onLoadStart={()=>setThumbLoading(true)}
        onLoad={()=>setThumbLoading(false)}
        className='w-full h-[200px]'
        resizeMode='cover'
        />
        
        <View className='bg-black/50 absolute right-2 bottom-2 px-1 rounded-md'>
            <Text className='text-white font-rubik text-sm'>{format(duration)}</Text>
        </View>
      </View>
      <View className='px-3 flex-row gap-2  items-center'>
        <UserLogo
        handlePress={()=>navigate("Channel",{channelId:owner.username})}
        uri={owner.avatar}
        />

        <View className='flex-1'>
            <Text className='text-black font-rubik-bold dark:text-white' numberOfLines={2}>{title}</Text>
            <Text className='text-gray-600 text-xs font-rubik dark:text-gray-300'>{`${owner.fullname}  •  ${views} views  •  ${timeAgo(createdAt)}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default VideoCard