import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import UserLogo from './UserLogo'
import Icon from '../constants/Icons'

const TweetCard = () => {
  return (
    <View className='gap-2'>
        <View className='flex-row items-center gap-2 pl-4'>
            <UserLogo
            uri='https://lickd.co/wp-content/uploads/2022/11/Canva-YouTube-Thumbnail-creator.jpeg'
            //handlePress={()}
            heightAndWidth={9}
        />
        <Text className='text-sm text-gray-600 font-rubik-bold dark:text-gray-300'>shabaz40khan</Text>
      </View>
    <View className='p-3 border-2 rounded-md border-secondary dark:border-dark-100'>
        <Text className='text-lg font-rubik dark:text-white'>Hello everyone kaise ho aap log mujhe pata hai aaplog badhiya honge or batao kya haal chal mitro sab thi hai na ya fir data dun a kr batao mujhe jaldi se</Text>
    </View>
    <View className='absolute p-3 bg-white border rounded-full -bottom-6 right-3 border-secondary dark:bg-dark border-dark-100'>
        <TouchableOpacity>
            <Icon name="Heart" color='#60A5FA' size={20}/>
        </TouchableOpacity>
    </View>
    </View>
  )
}

export default TweetCard