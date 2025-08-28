import { View, Text, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import Icon from '../constants/Icons'
interface CustomIconsTypes{
    name:any,
    color?:string,
    size?:number
    className?:string,
    badge?:boolean,
    handlePress?:()=>void
}
const CustomIcon:FC<CustomIconsTypes> = ({className, name, color = "#1D4ED8", size=20, badge=false, handlePress}) => {
  return (
    <TouchableOpacity className={`bg-primary-50 h-9 w-9 justify-center items-center border border-primary-600 rounded-md relative dark:bg-primary-600 ${className}`}
    onPress={handlePress}
    >
        <Icon name={name} color={color} size={size}/>
        {badge &&<View className='absolute -top-1.5 -right-1.5 bg-danger h-5 w-5 rounded-full justify-center items-center'>
            <Text className='text-white font-cormorantgaramond text-sm bottom-0.5'>3</Text>
            </View>}
    </TouchableOpacity>
  )
}

export default CustomIcon