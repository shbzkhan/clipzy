import { View, Text } from 'react-native'
import React, { useState } from 'react'
import AuthBox from '../components/AuthBox'
import { useSelector } from 'react-redux'

const Post = () => {
  const user = useSelector((state:any)=>state.user.user)
  if(!user) return <AuthBox name="Video Creation"/>
  return (
    <View>
      <Text>Post</Text>
    </View>
  )
}

export default Post