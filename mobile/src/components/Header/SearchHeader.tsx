import { View, TouchableOpacity, TextInput, Alert } from 'react-native'
import React from 'react'
import { goBack, navigate } from '../../navigation/NavigationUtils'
import Icon from '../../constants/Icons'
import SearchInput from '../SearchInput'

const SearchHeader = ({setSearch, search}:{setSearch:any, search:string}) => {
  return (
    <View className='flex-row items-center py-1'>
        <TouchableOpacity
        onPress={()=>goBack()}
        >
        <Icon name='ChevronLeft' color='#2563EB' size={40} />
        </TouchableOpacity>
        <View className='flex-1'>
      <SearchInput
      handleChange={(e)=>setSearch(e)}
      handlePress={()=>navigate("SearchVideo", {search})}
      />
      </View>

      </View>
  )
}

export default SearchHeader