import { View, Text } from 'react-native'
import React, { useState } from 'react'
import AuthBox from '../components/AuthBox'

const Profile = () => {
  const [user, setUser] = useState<boolean>(true)
  if(user) return <AuthBox name="Your Profile"/>
  return (

    <View>
      <Text>Profile</Text>
    </View>
  )
}

export default Profile