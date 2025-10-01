import { View, Text, Image, StatusBar } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { resetAndNavigate } from '../navigation/NavigationUtils';
import { useCurrentUserQuery, useRefreshAccessTokenMutation } from '../redux/api/authApi';
import { useDispatch } from 'react-redux';
import { userData } from '../redux/slice/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from "jwt-decode"
import GlobalLoader from '../components/GlobalLoader';


interface DecodedToken {
  exp:number
}

const Splash:FC = () => {
const dispatch = useDispatch()
const [authenticated, setAuthenticated] = useState<boolean>(false)
const [checkedToked, setCheckedToked] = useState<boolean>(false)
const [refreshAccessToken,{isLoading:refreshTokenLoading}] = useRefreshAccessTokenMutation()


  const refreshTokenHandler =async()=>{
        const access_token = await AsyncStorage.getItem("access-token");
        const refresh_token = await AsyncStorage.getItem("refresh-token");
        if(access_token){
          const decodedAcesssToken = jwtDecode<DecodedToken>(access_token)
          const decodedRefreshToken = jwtDecode<DecodedToken>(refresh_token)
          const currentTime = Date.now()/1000
          if(decodedRefreshToken?.exp < currentTime){
             resetAndNavigate("WelcomeScreen")

            return
          }

          if(decodedAcesssToken?.exp < currentTime){
            try {
              const updatedRefreshToken = await refreshAccessToken({refreshToken:refresh_token})
              console.log("updatedRefreshToken ", updatedRefreshToken)
              await AsyncStorage.setItem("access-token", updatedRefreshToken?.data?.data.accessToken)
              await AsyncStorage.setItem("refresh-token", updatedRefreshToken?.data?.data.refreshToken)
            } catch (error) {
              console.log("Occure error when refresh token ", error)
              resetAndNavigate("WelcomeScreen")
              return
            }
          }
          resetAndNavigate("MainTabs")
          return
        }
        resetAndNavigate("WelcomeScreen")
  }

//   const {data, isLoading:currentDataLoading} = useCurrentUserQuery(undefined, {skip:!authenticated})
//   useEffect(()=>{
//      if(refreshTokenLoading || currentDataLoading) return;
//     if(data){
//     const user = data.data.user
//     console.log("user data splace screen", user)
//    dispatch(userData(user))
// }
//   },[data, dispatch, refreshTokenLoading])


    useEffect(()=>{
        const timeoutId =  setTimeout(() => {
            const checkToken = async () => {
            await refreshTokenHandler();
              };
          checkToken();
        }, 1000)
        return ()=> clearTimeout(timeoutId)
    })

  return (
    <View className='bg-primary-600 h-full flex justify-center items-center'>
      <StatusBar barStyle={"light-content"} />
      <Image
      source={require("../assets/images/clipzylogo.png")}
      className='w-28 h-28'
      tintColor="white"
      />
    </View>
  )
}

export default Splash