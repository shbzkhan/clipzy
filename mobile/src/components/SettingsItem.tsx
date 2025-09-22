import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from '../constants/Icons';

interface SettingsItemProps {
  icon: string;
  title: string;
  onPress?: ()=>void;
  textStyle?: string;
  showArrow?: boolean;
  iconColor?:string
}

const SettingsItem = ({icon, title, onPress, textStyle,iconColor, showArrow = true}: SettingsItemProps)=>{
return (
  <TouchableOpacity
  onPress={onPress}
  className='flex flex-row items-center justify-between py-3'
  >
    <View className='flex flex-row gap-3 items-center'>
      <Icon
      name={icon}
      size={20}
      color={iconColor}
      />
      <Text
      className={`text-lg font-rubik-medium text-black-300 dark:text-white ${textStyle}`}
      >{title}</Text>
    </View>
    {showArrow && (
      <Icon
      name={"ChevronRight"}
      />
    )}
  </TouchableOpacity>
)
}

export default SettingsItem