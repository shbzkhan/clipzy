import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { FC, useState } from 'react'
import { navigate } from '../navigation/NavigationUtils'
import { SheetManager } from 'react-native-actions-sheet'
import PlaylistUploader from './playlist/PlaylistUploader'


interface videoCardProps{
    _id:string
    name:string
    thumbnail:string
    description:string
    videos:string[]
    setIsCreatePlaylist?:any
    setIsUpdatePlaylist?:any
    setVideoData?:any
}

const PlaylistCard:FC<videoCardProps> = ({_id, name, thumbnail, description, videos, setIsCreatePlaylist,setIsUpdatePlaylist, setVideoData }) => {

  const handleCreatePlaylistHandler =(pid:string, pname:string, pdescription:string)=>{
        setIsCreatePlaylist(true)
        setIsUpdatePlaylist(true)
        setVideoData({
          id:pid,
          name:pname,
          description:pdescription
      })
  }

  return (
    <>
    <TouchableOpacity className='flex-row gap-2'
      onPress={()=>navigate("PlaylistVideo",{id:_id})}
      onLongPress={()=>{
        if(!setVideoData) return
        handleCreatePlaylistHandler(_id, name, description)
        }}>
    <View className='relative items-center justify-center w-48 h-28 rounded-xl overf'>
        <View className='h-full w-44 bg-primary-600 rounded-xl' />
        <View className='absolute top-1'>
      <Image
      source={{uri:"https://lickd.co/wp-content/uploads/2022/11/Canva-YouTube-Thumbnail-creator.jpeg",}}
      className='w-48 h-28 rounded-xl'
      resizeMode='cover'
      />
      </View>
      <View className='absolute items-center justify-center w-full h-full top-1 bg-black/20 dark:bg-black/45 rounded-xl'>
      <Text className='text-xl text-white font-rubik-bold'>{videos.length} videos</Text>
      </View>
      </View>
      <View className='flex-1 gap-1 pt-3'>
        <Text numberOfLines={3} className='font-rubik-semibold dark:text-white'>{name}</Text>
        <Text className='text-sm text-gray-600 font-rubik-medium dark:text-gray-300' numberOfLines={2}>{description}</Text>
      </View>
    </TouchableOpacity>
      </>
  )
}

export default PlaylistCard