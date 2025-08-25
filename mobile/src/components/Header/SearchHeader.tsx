import { View, TouchableOpacity} from 'react-native'
import React, { FC } from 'react'
import Icon from '../../constants/Icons'
import SearchInput from '../SearchInput'
import CustomIcon from '../CustomIcon'


interface searchInputProps{
    value?:string
    PressX?:()=>void
    backPress?:()=>void
}
const SearchHeader:FC<searchInputProps> = ({value, PressX, backPress,...props}) => {
  return (
    <View className='flex-row items-center py-1 gap-3'>
        <TouchableOpacity
        onPress={backPress}
        >
        <Icon name='ChevronLeft' color='#2563EB' size={40} />
        </TouchableOpacity>
      <SearchInput
      value={value}
      PressX={PressX}
      {...props}
      />
      <TouchableOpacity>
        <CustomIcon name="Mic"/>
      </TouchableOpacity>
      </View>
  )
}

export default SearchHeader