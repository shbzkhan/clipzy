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
import { SheetManager } from 'react-native-actions-sheet'


interface videoCardProps{
    // videoPress:()=>void
    _id:string
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
  const { colorScheme } = useColorScheme()
  
    const shimmerColors =
      colorScheme === 'dark'
        ? ['#22313F', '#506A85', '#22313F'] 
        : ['#ebebeb', '#c5c5c5', '#ebebeb'] 
  
   const[thumbLoading, setThumbLoading]=useState(true)

   const handleSheetOpen = (video_id:string, owner_id:string)=>{
          SheetManager.show("videoDetails-sheet",{
             payload:{
               entityId:{
                 video_id,
                 owner_id,
                 thumb_uri:thumbnail,
                 video_title:title,
                 isPlaylist:false
               }
             }
           })
     }
  return (
    <TouchableOpacity className='gap-4'
     onPress={()=>navigate("Video",{id:_id})}
     onLongPress={()=>handleSheetOpen(_id, owner._id)}
    >
      <View className='relative'>
        {thumbLoading && (
          <ShimmerPlaceholder
            style={{ width: '100%', height: 200 }}
            shimmerColors={shimmerColors}
          />
        )}
        <Image
        source={{uri:thumbnail}}
        onLoadStart={()=>setThumbLoading(true)}
        onLoad={()=>setThumbLoading(false)}
        className='w-full h-[200px]'
        resizeMode='cover'
        />
        
        <View className='absolute px-1 rounded-md bg-black/50 right-2 bottom-2'>
            <Text className='text-sm text-white font-rubik'>{format(duration)}</Text>
        </View>
      </View>
      <View className='flex-row items-center gap-2 px-3'>
        <UserLogo
        handlePress={()=>navigate("Channel",{channelId:owner.username})}
        uri={owner.avatar}
        />

        <View className='flex-1'>
            <Text className='text-black font-rubik-bold dark:text-white' numberOfLines={2}>{title}</Text>
            <Text className='text-xs text-gray-600 font-rubik dark:text-gray-300'>{`${owner.username}  •  ${views} views  •  ${timeAgo(createdAt)}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default VideoCard