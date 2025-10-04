import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { navigate, resetAndNavigate } from '../navigation/NavigationUtils'
import { SheetManager } from 'react-native-actions-sheet'
import { GoogleSignin,} from '@react-native-google-signin/google-signin'
import ImageIcon from '../constants/ImageIcon'
import { ToastShow } from '../utils/Tost'
import { useDispatch } from 'react-redux'
import { userData } from '../redux/slice/userSlice'
import { useGoogleLoginMutation } from '../redux/api/authApi'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomButton from '../components/CustomButton'
import LottieView from 'lottie-react-native';
import welcomeAnimation from '../assets/images/welcome.json';
import GlobalLoader from '../components/GlobalLoader'


const WelcomeScreen = ({name}:any) => {
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
      console.log("login data", userLoggedIn.data)
          ToastShow(userLoggedIn.message, "success")
          console.log(userLoggedIn)
          dispatch(userData(userLoggedIn.data.user))
          await AsyncStorage.setItem("access-token", userLoggedIn?.data?.accessToken)
          await AsyncStorage.setItem("refresh-token", userLoggedIn?.data?.refreshToken)
          resetAndNavigate("MainTabs")
          //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGNiYjhlNDA0MzhmMGI4OGI2ZmY0ODUiLCJpYXQiOjE3NTkzMjYzMjYsImV4cCI6MTc1OTkzMTEyNn0.-DuhLfjjc-307O7z91CB4xRnLMW7NCWFzMXi0eqw3Wk"

    } catch (e: any) {
       console.log("Google error full:", e);
    console.log("Google error data:", e?.data);
  console.log("Google error status:", e?.status);
    }
  };
  
  return (
    <SafeAreaView className={`flex-1 ${isLoading ?"bg-white":"bg-primary-50"} items-center px-4 dark:bg-dark`}>
        {
          !isLoading ?(
            <View className='items-center justify-center gap-4'>
              <View className='items-center justify-center h-[400px]'>
                <LottieView 
                    source={welcomeAnimation} 
                    autoPlay 
                    loop 
                    style={{height: 400, aspectRatio:1}} 
                />
              </View>
            <Text className='mb-5 text-3xl font-extrabold dark:text-white'>Welcome to Clipzy</Text>
            <CustomButton
            icon={ImageIcon.google}
            title='Login with Google'
            containerStyles='w-72 h-12 bg-white'
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
            containerStyles='w-72 h-12 mt-3'
            // handlePress={()=>{
            //             SheetManager.show("login-sheet",{
            //             payload:{
            //               entityId:"hello",
            //             }
            //           })
            //         }}
            handlePress={()=>navigate("Login")}
            />
          
        </View>
          ):(
            <GlobalLoader/>
          )
        }
      
    </SafeAreaView>
  )
}

export default WelcomeScreen