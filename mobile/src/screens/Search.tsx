import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from '../constants/Icons'
import { goBack, navigate } from '../navigation/NavigationUtils'

const Search = () => {
  return (
    <SafeAreaView className='h-full px-4'>
      <View className='h-14 flex-row'>
        <TouchableOpacity className='h-9 w-9'
        onPress={()=>goBack()}
        >
        <Icon name='ArrowLeft' color='#1D4ED8' size={30} />
        </TouchableOpacity>
        <Text>hello</Text>
      </View>
      
    </SafeAreaView>
  )
}

export default Search