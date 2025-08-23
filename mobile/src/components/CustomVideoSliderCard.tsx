import { View, Text, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import Icon from '../constants/Icons'
import { icons } from 'lucide-react-native'

type iconsName = keyof typeof icons
interface CustomVideoSliderProps {
    icon:iconsName
    title:string | number
    focused?:boolean | false
    handlePress?:()=>void

}
const CustomVideoSliderCard:FC<CustomVideoSliderProps> = ({icon, title, handlePress, focused}) => {
  return (
    <TouchableOpacity className='bg-secondary px-4 py-2 rounded-lg flex-row items-center gap-1'
    onPress={handlePress}
    >
        <Icon name={icon} color='#60A5FA' size={20} focused={focused}/>
      <Text className='font-rubik-medium '>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomVideoSliderCard
