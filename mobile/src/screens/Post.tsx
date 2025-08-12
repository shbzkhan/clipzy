import { View, Text } from 'react-native'
import React, { useState } from 'react'
import AuthBox from '../components/AuthBox'

const Post = () => {
  const [user, setUser] = useState<boolean>(true)
  if(user) return <AuthBox name="Video Creation"/>
  return (
    <View>
      <Text>Post</Text>
    </View>
  )
}

export default Post