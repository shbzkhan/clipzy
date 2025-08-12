import { View, Text, Button, Image } from 'react-native'
import React, { FC, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../constants/Logo'
import HomeHeader from '../components/Header/HomeHeader'
import { goBack } from '../navigation/NavigationUtils'
import AuthBox from '../components/AuthBox'


const Home = () => {
  // const navigation = useNavigation()
  const [user, setUser] = useState(true)

  
  return (
     <SafeAreaView className='h-full bg-red'>
      <HomeHeader/>
    <Text style={{ color: "blue", fontWeight: "bold" }}>Home</Text>
    </SafeAreaView>
  )
}

export default Home