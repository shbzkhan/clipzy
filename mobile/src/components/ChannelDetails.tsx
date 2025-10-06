import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import Icon from '../constants/Icons'
import SubscribedButton from './SubscribedButton'
import UserLogo from './UserLogo'


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