import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from '../../constants/Icons'
import { goBack } from '../../navigation/NavigationUtils'

const CustomHeader = ({title}:{title:string}) => {
  return (
    <View className='relative flex-row items-center py-4'>
        <TouchableOpacity onPress={()=>goBack()}>
        <Icon name='ChevronLeft' color='#2563EB' size={35}
        />
        </TouchableOpacity>
        <View className='absolute items-center justify-center w-full'>
            <Text className='text-2xl font-extrabold text-center dark:text-white'>{title}</Text>
        </View>
    </View>
  )
}

export default CustomHeader