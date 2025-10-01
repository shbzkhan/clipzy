import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const GlobalUploader = () => {
  const { imageUrl, title, isUploading } = useSelector((state:RootState) => state.uploadPost);

  if(!isUploading) return null

  return (
     <View className="absolute bottom-20 left-0 right-0 bg-primary-500/45 rounded-2xl items-center gap-3 shadow-lg flex-row justify-start space-x-2 mx-2 overflow-hidden">
        <Image
          source={{uri:imageUrl}}
          className='h-full w-24'
        />
      <View className='py-2'>
      <Text className="text-white font-bold text-base">{title.slice(0,30)}...</Text>
      <Text className="text-white font-bold text-base">Uploading Video...</Text>
      </View>
    </View>
  )
}

export default GlobalUploader