import { Text, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import Icon from '../constants/Icons'
import { RadioButton } from 'react-native-paper'
import { useColorScheme } from 'nativewind'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

interface ThemeButton {
  themeName:string
  handlePress:()=>void
  icon:string
  title:string
}
const ThemeButton:FC<ThemeButton> = ({themeName, handlePress, icon, title}) => {
    const {colorScheme} = useColorScheme();
    const mode = useSelector((state:RootState)=>state.theme.mode)
  return (
    <TouchableOpacity className='flex-row text-center bg-secondary p-3 gap-2 rounded-md dark:bg-dark-100'
    onPress={handlePress}
    >

            <Icon name={icon}/>
            <Text className='font-rubik-medium text-lg dark:text-white flex-1'>{title}</Text>  
            <RadioButton
            color='white'
            value={themeName}
            status={mode === themeName ? "checked":"unchecked"}
            // color="2563EB"
            onPress={handlePress}
            />
    </TouchableOpacity>
  )
}

export default ThemeButton