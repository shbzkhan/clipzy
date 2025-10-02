import { View, Text } from 'react-native'
import React from 'react'
import Logo from '../../constants/Logo'
import CustomIcon from '../CustomIcon'
import { navigate } from '../../navigation/NavigationUtils'
import Slider from './Slider'

const HomeHeader = () => {
  return (
    <View className=' h-14 w-full flex-row gap-1 items-center justify-between px-4'>
      <View className='flex-row gap-1 items-center'>
      <Logo/>
      <Text className='text-primary-600 font-tinos-bold text-2xl'>CLIPZY</Text>
      </View>
      <View className='flex-row gap-4 items-center'>
      <CustomIcon
       name="Bell" 
       badge={true} 
       handlePress={()=>navigate("Notification")}/>

      <CustomIcon 
      name="Search"
      handlePress={()=>navigate("Search")}
      />
      </View>
    </View>
      
  )
}

export default HomeHeader