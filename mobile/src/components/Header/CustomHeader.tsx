import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from '../../constants/Icons'
import { goBack } from '../../navigation/NavigationUtils'

const CustomHeader = () => {
  return (
    <View className='py-4 flex-row items-center gap-24'>
        <TouchableOpacity onPress={()=>goBack()}>
        <Icon name='ChevronLeft' color='#2563EB' size={35}
        />
        </TouchableOpacity>
            <Text className='font-extrabold text-2xl dark:text-white'>Appearance</Text>
    </View>
  )
}

export default CustomHeader