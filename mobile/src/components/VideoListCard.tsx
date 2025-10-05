import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { FC } from 'react'
import { navigate } from '../navigation/NavigationUtils'
import { SheetManager } from 'react-native-actions-sheet'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Trash2 } from 'lucide-react-native'
import { usePlaylistDeleteVideoMutation } from '../redux/api/playlistApi'
import { ToastShow } from '../utils/Tost'


interface videoCardProps{
    _id:string
    title:string
    thumbnail:string
    owner:{
      _id:string
      fullname:string
    }
    views:string
    isPlaylistVideo?:any
    playlistId?:string
    handleDeleteVideoFromPlaylist?: (videoId: string) => Promise<void>;
}
const VideoListCard:FC<videoCardProps> = ({_id, title, thumbnail,views, owner: { _id:userId, fullname,}, isPlaylistVideo, handleDeleteVideoFromPlaylist}) => {
  const {user} = useSelector((state:RootState)=>state.user)


  const handleSheetOpen = (userIdd:string)=>{
      if(userIdd !== user?._id) return
       SheetManager.show("login-sheet",{
          payload:{
            entityId:_id,
          }
        })
  }
  return (
    <TouchableOpacity className='flex-row gap-2 px-3'
    onPress={()=>navigate("Video",{id:_id})}
    onLongPress={()=>handleSheetOpen(userId)}
    >
      <Image
      source={{uri: thumbnail}}
      className='w-48 h-28 rounded-xl'
      resizeMode='cover'
      />
      <View className='flex-1'>
        <Text numberOfLines={3} className='font-rubik-semibold dark:text-white'>{title}</Text>
        <Text className='text-sm text-gray-600 font-rubik dark:text-gray-300'>{fullname}</Text>
        <Text className='text-sm text-gray-600 font-rubik dark:text-gray-300'>{views} Views</Text>
      </View>
      {
        isPlaylistVideo && (
          <TouchableOpacity className='h-full py-5'
           onPress={() => handleDeleteVideoFromPlaylist?.(_id)}
          // disabled={isLoading}
          >
            <Trash2 color={"red"}/>
          </TouchableOpacity>
        )
      }
    </TouchableOpacity>
  )
}

export default VideoListCard