import { View, Text, Image, StatusBar } from 'react-native'
import React, { FC, useEffect } from 'react'
import { resetAndNavigate } from '../navigation/NavigationUtils';
import { useCurrentUserQuery } from '../redux/api/authApi';
import { useDispatch } from 'react-redux';
import { userData } from '../redux/slice/userSlice';

const Splash:FC = () => {
const dispatch = useDispatch()
const {data} = useCurrentUserQuery()
  useEffect(()=>{
    if(data){
    const user = data.data.user
   dispatch(userData(user))
}
  },[data, dispatch])
  
  const refreshToken =async()=>{
    
  }


    useEffect(()=>{
        const timeoutId = setTimeout(() => {
            resetAndNavigate("MainTabs")
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