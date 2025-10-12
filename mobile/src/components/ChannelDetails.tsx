import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import Icon from '../constants/Icons'
import SubscribedButton from './SubscribedButton'
import UserLogo from './UserLogo'
import { ToastShow } from '../utils/Tost'
import { useToggleConnetionMutation } from '../redux/api/connectionApi'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'


const ChannelHeader =({user, totalVideos})=>{
  const userDetails = useSelector((state:RootState)=>state.user.user)
    const [isConnected, setIsConnected] = useState(user.isSubscribed);
     const [toggleConnetion] = useToggleConnetionMutation()

    const isConnetionHandle = async()=>{
        try {
        if (isConnected) {
          setIsConnected(false);
        } else {
          setIsConnected(true);
        }
         const toggledConnection = await toggleConnetion(user._id).unwrap()
         setIsConnected(toggledConnection.data.subscribed)
        } catch (error) {
          setIsConnected(false)
          ToastShow(error.data.message)
        }
      }
      return (
        <>
        <View className='w-full h-24'>
                {user.coverImage ?( 
                  <Image
                  source={{uri:user.coverImage}}
                  className='w-full h-full'
                  resizeMode='cover'
                  />
                ):(
                <TouchableOpacity className='w-full h-full bg-secondary dark:bg-black/30' 
                >
                <View className='items-center justify-center h-full'>
                <Icon name='Camera' size={38}/>
                </View>
                </TouchableOpacity>
                )}
                
      </View>
      <View className='gap-5 px-4 mt-5 mb-4'>
          <View className='flex-row items-center gap-5'>
                  <UserLogo
                  heightAndWidth={24}
                  uri={user.avatar}
                  />
              <View className=''>
                  <Text className='text-2xl font-rubik-bold dark:text-white' numberOfLines={1}>{user.fullname}</Text>
                  <Text className='text-sm text-black dark:text-gray-300 font-rubik-medium'>@{user.username}</Text>
                  <Text className='text-xs text-gray-600 dark:text-gray-300 font-rubik'>{`${user.subscribersCount} connetions • ${totalVideos} videos`}</Text>
                </View>
              </View>
              {
                user._id !== userDetails?._id &&(
                  <SubscribedButton 
                  handlePress={isConnetionHandle}
                  isConnected={isConnected}
                  className='py-2'
                  />      
                  
                )
              }
              </View></>
      )
    }

    export default ChannelHeader