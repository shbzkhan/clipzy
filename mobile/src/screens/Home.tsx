import { View, Text, Button, Image } from 'react-native'
import React, { FC } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../constants/Logo'
import Header from '../components/Header/Header'


const Home = () => {
  // const navigation = useNavigation()
  return (
     <SafeAreaView className='h-full bg-red'>
      <Header/>
      <Text style={{ color: "blue", fontWeight: "bold" }}>Home</Text>
    </SafeAreaView>
  )
}

export default Home