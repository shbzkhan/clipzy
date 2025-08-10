import { View, Text } from 'react-native'
import React from 'react'
import Logo from '../../constants/Logo'
import CustomIcon from '../CustomIcon'
import { navigate } from '../../navigation/NavigationUtils'

const Header = () => {
  return (
    <View className=' h-14 w-full flex-row gap-1 items-center justify-between border-b px-4 border-gray-200'>
      <View className='flex-row gap-1 items-center'>
      <Logo/>
      <Text className='text-primary-600 font-tinos-bold text-2xl'>CLIPZY</Text>
      </View>
      <View className='flex-row gap-4 items-center'>
      <CustomIcon
       name="Bell" 
       badge={true} 
       handlePress={()=>navigate("Search")}/>

      <CustomIcon 
      name="Search"
      handlePress={()=>navigate("Search")}
      />
      </View>
    </View>
  )
}

export default Header