import { View, TouchableOpacity, TextInput, Alert } from 'react-native'
import React from 'react'
import { goBack, navigate } from '../../navigation/NavigationUtils'
import Icon from '../../constants/Icons'
import SearchInput from '../SearchInput'
import { ToastShow } from '../../utils/Tost'

const SearchHeader = ({setSearch}:{setSearch:any}) => {
  return (
    <View className='flex-row border-b border-gray-100 items-center py-1'>
        <TouchableOpacity
        onPress={()=>goBack()}
        >
        <Icon name='ChevronLeft' color='#2563EB' size={40} />
        </TouchableOpacity>
        <View className='flex-1'>
      <SearchInput
      handlePress={()=>ToastShow("hello", "danger")}
      />
      </View>

      </View>
  )
}

export default SearchHeader