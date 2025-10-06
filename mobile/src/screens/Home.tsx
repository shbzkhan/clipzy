import {FlatList, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import HomeHeader from '../components/Header/HomeHeader'
import VideoCard from '../components/VideoCard'
import Slider from '../components/Header/Slider'
// import { Video } from '../utils/domyData'
import VideoCardLoader from '../components/Skeleton/VideoCardLoader'
import { Video } from '../types/video'
import { useGetVideosQuery } from '../redux/api/videoApi'
import { ActivityIndicator } from 'react-native-paper'
import EmptyState from '../components/EmptyState'
import { usePaginatedVideos } from '../hooks/usePaginatedVideos'



const Home = () => {
  const { videos, isLoading, handleLoadMore, handleRefresh, isFetching, page } = usePaginatedVideos({});

  return (
     <SafeAreaView className='bg-white dark:bg-dark'>
      <View className='gap-4 mb-2'>
      <HomeHeader/>  
      <Slider/>
      </View>
    <FlatList
    data={!isLoading?videos:[1,2,3,4]}
    keyExtractor={(video, index) =>!isLoading?video._id:index}
    onEndReached={handleLoadMore}
    onEndReachedThreshold={0.5}
    showsVerticalScrollIndicator={false}
    contentContainerClassName = "gap-6 pt-2 pb-32"
    renderItem={({item})=>(
      !isLoading?
      <VideoCard {...item} />
      :
      <VideoCardLoader/>
    )}
    refreshing={isFetching && page === 1 && !isLoading}
    onRefresh={handleRefresh}

    ListFooterComponent={
        isFetching && page > 1 ? (
          <ActivityIndicator  size="small" color="#2563EB" />
        ) : null
      }
      ListEmptyComponent={
        <EmptyState
          title='No Video Published'
          description='please published a videos'
          />
      }
    />
    </SafeAreaView>
  )
}

export default Home