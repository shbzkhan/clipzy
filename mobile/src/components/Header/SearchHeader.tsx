import { View, TouchableOpacity} from 'react-native'
import React from 'react'
import { goBack} from '../../navigation/NavigationUtils'
import Icon from '../../constants/Icons'
import SearchInput from '../SearchInput'

const SearchHeader = ({handlePress,handleChange}:any) => {
  return (
    <View className='flex-row items-center py-1'>
        <TouchableOpacity
        onPress={()=>goBack()}
        >
        <Icon name='ChevronLeft' color='#2563EB' size={40} />
        </TouchableOpacity>
        <View className='flex-1'>
      <SearchInput
      handleChange={handleChange}
      handlePress={handlePress}
      />
      </View>

      </View>
  )
}

export default SearchHeader