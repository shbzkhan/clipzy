import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from '../constants/Icons'
import CustomButton from './CustomButton'
import { navigate } from '../navigation/NavigationUtils'


const AuthBox = ({name}:any) => {
  return (
    <SafeAreaView className='flex-1 bg-primary-50 justify-center items-center px-4'>
        <View className='justify-center items-center gap-4'>
            <Icon name='Lock' color='#3B82FE' size={70} />
            <Text className='font-extrabold text-3xl'>Welcome to {name}</Text>
            <Text className='font-medium text-gray-400 px-12 text-center leading-6'>Log in or sign up to unlock personalized feature, watch history, video and manage your account</Text>
            <CustomButton
            title='Log In'
            containerStyles='w-64 h-12'
            handlePress={()=>navigate("Login")}
            />
            <CustomButton
            title='Register'
            containerStyles='w-64 h-12 bg-transparent border-2 border-primary-600 mt-2'
            textStyles='text-primary-700'
            handlePress={()=>navigate("Register")}
            />
        </View>
      
    </SafeAreaView>
  )
}

export default AuthBox