import React from 'react'
import { Pressable, TextInput, View } from 'react-native'
import Icon from '../../constants/Icons'
import { navigate } from '../../navigation/NavigationUtils'

const HomeSearchInput = () => {
  return (
    <Pressable className='flex-row justify-between mx-3 overflow-hidden border rounded-md border-primary-600'
            onPress={()=>navigate("Search")}
            >
            <TextInput
            className='px-4 placeholder:text-gray-600 dark:placeholder:text-gray-400'
            placeholder='Search a video..'
            editable={false}
            />
              <View className='justify-center px-3 bg-primary-600'>
                {/* <Search color="white" /> */}
                <Icon
                name='Search'
                color='white'
                />
                </View>   
            </Pressable>
  )
}

export default HomeSearchInput