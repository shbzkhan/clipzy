import { View, Text } from 'react-native'
import React from 'react'
import Logo from '../../constants/Logo'
import CustomIcon from '../CustomIcon'
import { navigate } from '../../navigation/NavigationUtils'
import Slider from './Slider'

const HomeHeader = () => {
  return (
    <View className='flex-row items-center justify-between w-full gap-1 px-4  h-14'>
      <View className='flex-row items-center gap-1'>
      <Logo/>
      <Text className='text-2xl text-primary-600 font-tinos-bold'>CLIPZY</Text>
      </View>
      <View className='flex-row items-center gap-4'>
      <CustomIcon
       name="Bell" 
       badge={true} 
       handlePress={()=>navigate("Notification")}/>
      </View>
    </View>
      
  )
}

export default HomeHeader