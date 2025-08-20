import {FlatList, View } from 'react-native'
import React, { FC, useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import HomeHeader from '../components/Header/HomeHeader'
import { goBack, navigate } from '../navigation/NavigationUtils'
import VideoCard from '../components/VideoCard'
import Slider from '../components/Header/Slider'
import VideoCardLoader from '../components/Skeleton/VideoCardLoader'
import { Video } from '../utils/domyData'



const Home = () => {
  // const navigation = useNavigation()
  const insets = useSafeAreaInsets();
  

  
  return (
     <SafeAreaView className='flex-1 bg-white'>
      <View className='gap-3'>
      <HomeHeader/>
      <Slider/>
      </View>
    <FlatList
    data={Video}
    keyExtractor={video =>video._id}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={[{ paddingBottom: insets.bottom + 56,}]}
    contentContainerClassName = "gap-6 pt-2"
    renderItem={({item})=>(
      <VideoCard {...item} />
      // <VideoCardLoader/>
    )}


    />
    </SafeAreaView>
  )
}

export default Home