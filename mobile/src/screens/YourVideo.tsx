import React, { useEffect, useState } from 'react'
import CustomHeader from '../components/Header/CustomHeader'
import VideoListCard from '../components/VideoListCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native'
import { useGetVideosQuery } from '../redux/api/videoApi'
import VideoListCardLoader from '../components/Skeleton/VideoListCardLoader'
import { Video } from '../types/video'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { ActivityIndicator } from 'react-native'

const YourVideo = () => {
  const user = useSelector((state:RootState)=>state.user.user)
  const [page, setPage] = useState<number>(1);
  const [videos, setVideos] = useState<Video[]>([]);
  const { data, isLoading, isFetching, refetch } = useGetVideosQuery({page, userId:user?._id});
    
      useEffect(()=>{
        if(page === 1){
          setVideos(data?.docs)
        }else{
          const combinedVideos = page === 1 ? data?.docs : [...videos, ...data?.docs];
            const uniqueVideo = Array.from(new Map(combinedVideos?.map(video => [video._id, video])).values());
          setVideos(uniqueVideo);
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
    <SafeAreaView className='flex-1 bg-white dark:bg-dark px-4'>
      <CustomHeader title='Your Videos'/>
        <FlatList
            data={!isLoading?videos:[1,2,3,4,5,6]}
            keyExtractor={(video, index) =>!isLoading?video._id:index.toString()}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
            contentContainerClassName = "gap-6 pt-2 pb-32"
            renderItem={({item})=>(
            !isLoading?
              <VideoListCard {...item} />
              :
            <VideoListCardLoader/>
            )}

            refreshing={isFetching && page === 1}
                onRefresh={handleRefresh}
            
                ListFooterComponent={
                    isFetching && page > 1 ? (
                      <ActivityIndicator  size="small" color="#2563EB" />
                    ) : null
                  }
        
            />
    </SafeAreaView>
  )
}

export default YourVideo