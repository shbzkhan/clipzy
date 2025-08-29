import {FlatList, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import HomeHeader from '../components/Header/HomeHeader'
import VideoCard from '../components/VideoCard'
import Slider from '../components/Header/Slider'
import { Video } from '../utils/domyData'
import VideoCardLoader from '../components/Skeleton/VideoCardLoader'



const Home = () => {
  // const navigation = useNavigation()
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false)
  

  
  return (
     <SafeAreaView className='bg-white dark:bg-dark'>
      <View className='gap-4 mb-2'>
      <HomeHeader/>  
      <Slider/>
      </View>
    <FlatList
    data={!loading?Video:[1,1,1,1]}
    keyExtractor={(video) =>video._id}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={[{ paddingBottom: insets.bottom + 60,}]}
    contentContainerClassName = "gap-6 pt-2"
    renderItem={({item})=>(
      !loading?
      <VideoCard {...item} />
      :
      <VideoCardLoader/>
    )}

    />
    </SafeAreaView>
  )
}

export default Home