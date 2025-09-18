import { View, Text } from 'react-native'
import React, { useState } from 'react'
import AuthBox from '../components/AuthBox'
import { useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'

const Post = () => {
  const user = useSelector((state:any)=>state.user.user)
  if(!user) return <AuthBox name="Video Creation"/>
  return (
    <SafeAreaView className='flex-1 bg-white dark:bg-dark'>
      <Text>Post</Text>
    </SafeAreaView>
  )
}

export default Post