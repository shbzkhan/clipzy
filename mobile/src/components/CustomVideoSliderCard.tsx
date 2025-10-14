import { icons } from 'lucide-react-native'
import React, { FC } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Icon from '../constants/Icons'

type iconsName = keyof typeof icons
interface CustomVideoSliderProps {
    icon:iconsName
    title:string | number | undefined
    focused?:boolean | false
    handlePress?:()=>void

}
const CustomVideoSliderCard:FC<CustomVideoSliderProps> = ({icon, title, handlePress, focused}) => {
  return (
    <TouchableOpacity className='flex-row items-center gap-1 px-3 py-1 border rounded-full border-t-primar border-e-primary-600 border-secondary dark:border-gray-600 border-t-primary-600'
    onPress={handlePress}
    >
      <Icon name={icon} color='#60A5FA' size={20} focused={focused}/>
      <Text className='font-rubik-medium dark:text-white'>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomVideoSliderCard
