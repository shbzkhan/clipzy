import { View} from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import LottieView from 'lottie-react-native';
import LargeLoader from '../assets/images/larger-loader.json';

const GlobalLoader = () => {
  return (
    <View className='items-center justify-center flex-1 bg-white dark:bg-dark'>
      <View className='items-center justify-center h-[300px]'>
        <LottieView 
            source={LargeLoader} 
            autoPlay 
            loop 
            style={{height: 300, aspectRatio:1}} 
        />
      </View>
    </View>
  )
}

export default GlobalLoader