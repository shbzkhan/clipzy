import {FlatList, View, Text, Pressable } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { goBack, pop } from '../navigation/NavigationUtils'
import VideoCard from '../components/VideoCard'
import Slider from '../components/Header/Slider'
import SearchHeader from '../components/Header/SearchHeader'
import { useRoute } from '@react-navigation/native'
import VideoCardLoader from '../components/Skeleton/VideoCardLoader'
import { useEffect, useState } from 'react'
import { useGetVideoSearchedQuery, useGetVideosQuery } from '../redux/api/videoApi'
import { ActivityIndicator } from 'react-native'
import { Video } from '../types/video'



const SearchVideo = () => {
  const searchInput = useRoute()
  const query:string = searchInput.params
 const [page, setPage] = useState<number>(1);
  const [videos, setVideos] = useState<Video[]>([]);
  const { data, isLoading, isFetching, isError, refetch } = useGetVideoSearchedQuery({page,query});

  useEffect(()=>{
    console.log("videoSearch", data)
    if(page === 1){
      setVideos(data?.docs)
      console.log(data)
    }else{
      setVideos((prev) => [...prev, ...data?.docs]);
    }
  },[data,page])

   const handleRefresh = () => {
    setPage(1);
    refetch();
  };

  const handleLoadMore = () => {
    if (!isFetching && data?.hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  
  return (
     <SafeAreaView className='flex-1 bg-white dark:bg-dark'>
      <View className='gap-3 pb-2'>
        <Pressable className='px-4' onPress={()=>goBack()}>
       <SearchHeader
       value={query}
       editable={false}
       backPress={()=>pop(2)}
       />
       </Pressable>
      <Slider/>
      </View>
    <FlatList
    data={!isLoading?videos:[1,2,3,4]}
    keyExtractor={video =>video._id}
    onEndReached={handleLoadMore}
    onEndReachedThreshold={0.5}
    refreshing={isFetching && page === 1}
    onRefresh={handleRefresh}
    showsVerticalScrollIndicator={false}
    contentContainerClassName = "gap-6 pt-2 pb-14"
    renderItem={({item})=>(
      !isLoading?
      <VideoCard {...item} />
      :
      <VideoCardLoader/>
    )}

    ListHeaderComponent={
      <View className='px-4'>
        <Text className='text-primary-600 text-rubik'>Search Result: <Text className='text-black/70 text-rubik dark:text-white'>{query}</Text></Text>
      </View>
    }

    ListFooterComponent={
      isFetching && page > 1 ? (
          <ActivityIndicator size="small" color="#2563EB" />
        ) : null
      }

    />
    </SafeAreaView>
  )
}

export default SearchVideo