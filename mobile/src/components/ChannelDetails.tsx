import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import Icon from '../constants/Icons'
import { launchImageLibrary } from 'react-native-image-picker'
import { ToastShow } from '../utils/Tost'
import { userData } from '../redux/slice/userSlice'
import { useAvatarMutation,useCoverImageMutation} from '../redux/api/authApi'
import AuthBox from './AuthBox'
import UserLogo from './UserLogo'
import CustomIcon from './CustomIcon'
import SubscribedButton from './SubscribedButton'


const ChannelHeader =({user, totalVideos})=>{

      return (
        <>
        <View className='h-24 w-full'>
                {user.coverImage ?( 
                  <Image
                  source={{uri:user.coverImage}}
                  className='w-full h-full'
                  resizeMode='cover'
                  />
                ):(
                <TouchableOpacity className='h-full w-full bg-secondary dark:bg-black/30' 
                >
                <View className='justify-center items-center h-full'>
                <Icon name='Camera' size={38}/>
                </View>
                </TouchableOpacity>
                )}
                
      </View>
      <View className='px-4 gap-5 mt-5 mb-4'>
          <View className='flex-row items-center gap-5'>
                  <UserLogo
                  heightAndWidth={24}
                  uri={user.avatar}
                  />
              <View className=''>
                  <Text className='text-2xl font-rubik-bold dark:text-white' numberOfLines={1}>{user.fullname}</Text>
                  <Text className='text-black dark:text-gray-300 text-sm'>@{user.username}</Text>
                  <Text className='text-gray-600 dark:text-gray-300 text-xs'>{`${user.subscribersCount} subscribers • ${totalVideos} videos`}</Text>
                </View>
              </View>
              <SubscribedButton className='py-2'/>      
              </View></>
      )
    }

    export default ChannelHeader