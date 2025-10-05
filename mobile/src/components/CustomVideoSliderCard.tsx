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
    <TouchableOpacity className='flex-row items-center gap-1 px-4 py-2 rounded-lg bg-secondary dark:bg-dark-100'
    onPress={handlePress}
    >
      <Icon name={icon} color='#60A5FA' size={20} focused={focused}/>
      <Text className='font-rubik-medium dark:text-white'>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomVideoSliderCard
