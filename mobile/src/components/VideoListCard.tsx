import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { FC } from 'react'
import { navigate } from '../navigation/NavigationUtils'
import { SheetManager } from 'react-native-actions-sheet'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'


interface videoCardProps{
    _id:string
    title:string
    thumbnail:string
    owner:{
      _id:string
      fullname:string
    }
    views:string
}
const VideoListCard:FC<videoCardProps> = ({_id, title, thumbnail,views, owner: { _id:userId, fullname,}}) => {
console.log("owner", userId)
  const {user} = useSelector((state:RootState)=>state.user)

  const handleSheetOpen = (userId:string)=>{
      if(userId !== user?._id) return
       SheetManager.show("login-sheet",{
          payload:{
            entityId:_id,
          }
        })
  }
  return (
    <TouchableOpacity className='flex-row gap-2 '
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
        <Text className='text-gray-600 font-rubik text-sm dark:text-gray-300'>{fullname}</Text>
        <Text className='text-gray-600 font-rubik text-sm dark:text-gray-300'>{views} Views</Text>
      </View>
    </TouchableOpacity>
  )
}

export default VideoListCard