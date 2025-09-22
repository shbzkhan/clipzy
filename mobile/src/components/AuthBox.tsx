import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from '../constants/Icons'
import CustomButton from './CustomButton'
import { navigate } from '../navigation/NavigationUtils'
import { SheetManager } from 'react-native-actions-sheet'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import ImageIcon from '../constants/ImageIcon'
import { ToastShow } from '../utils/Tost'
import { useDispatch } from 'react-redux'
import { userData } from '../redux/slice/userSlice'
import { useGoogleLoginMutation } from '../redux/api/authApi'
import AsyncStorage from '@react-native-async-storage/async-storage'


const AuthBox = ({name}:any) => {
const dispatch = useDispatch();
const [googleLogin,{isLoading}] = useGoogleLoginMutation()

   const handleGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut()
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken;
    if (!idToken) {
      return;
    }
      const userLoggedIn = await googleLogin({idToken}).unwrap()
          ToastShow(userLoggedIn.message, "success")
          console.log(userLoggedIn)
          dispatch(userData(userLoggedIn.data.user))
          await AsyncStorage.setItem("token", userLoggedIn.data.accessToken)
    } catch (e: any) {
       console.log("Google error full:", e);
    console.log("Google error data:", e?.data);
  console.log("Google error status:", e?.status);
    }
  };
  
  return (
    <SafeAreaView className={`flex-1 ${isLoading ?"bg-white":"bg-primary-50"}  justify-center items-center px-4 dark:bg-dark`}>
        {
          !isLoading ?(
            <View className='justify-center items-center gap-4'>
            <Icon name='Lock' color='#3B82FE' size={70} />
            <Text className='font-extrabold text-3xl dark:text-white'>Welcome to {name}</Text>
            <Text className='font-medium text-gray-400 px-12 text-center leading-6'>Log in or sign up to unlock personalized feature, watch history, video and manage your account</Text>
            <CustomButton
            icon={ImageIcon.google}
            title='Login with Google'
            containerStyles='w-64 h-12 bg-white mb-3'
            textStyles='text-black dark:text-black'
            handlePress={handleGoogle}
            />
            <View className='flex-row items-center gap-5 rounded-full'>
              <View className='h-0.5 bg-primary-100 dark:bg-gray-400 w-16'/>
              <Text className='dark:text-white font-rubik'>OR</Text>
              <View className='h-0.5 bg-primary-200 dark:bg-gray-400 w-16 rounded-full' />
            </View>
            <CustomButton
            title='Continue with Email'
            containerStyles='w-64 h-12 mt-3'
            handlePress={()=>{
                        SheetManager.show("login-sheet",{
                        payload:{
                          entityId:"hello",
                        }
                      })
                    }}
            />
          
        </View>
          ):(
            <ActivityIndicator color="#2563EB" size="large"/>
          )
        }
      
    </SafeAreaView>
  )
}

export default AuthBox