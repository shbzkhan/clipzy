import { View, Text } from 'react-native'
import React, { useState } from 'react'
import AuthBox from '../components/AuthBox'

const Subscriptions = () => {
  const [user, setUser] = useState<boolean>(true)
    if(user) return <AuthBox name="Your Subscription"/>
  return (
    <View>
      <Text>Subscriptions</Text>
    </View>
  )
}

export default Subscriptions