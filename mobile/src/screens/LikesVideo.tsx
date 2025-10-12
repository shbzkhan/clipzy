import React from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import EmptyState from '../components/EmptyState'
import CustomHeader from '../components/Header/CustomHeader'
import VideoListCardLoader from '../components/Skeleton/VideoListCardLoader'
import VideoListCard from '../components/VideoListCard'
import { useLikedVideoQuery } from '../redux/api/likeApi'
import { RootState } from '../redux/store'

const LikesVideo = () => {
    const user = useSelector((state: RootState) => state.user.user);
      const {data, isLoading, isFetching, refetch} =useLikedVideoQuery()
  return (
    <SafeAreaView className='flex-1 px-3 bg-white dark:bg-dark'>
        <CustomHeader title="Liked Videos" />
        <FlatList
              data={!isLoading ? data : [1, 2, 3, 4, 5, 6]}
              keyExtractor={(video, index) =>
                !isLoading ? video._id : index.toString()
              }
              refreshing={isFetching && !isLoading}
              onRefresh={refetch}
              showsVerticalScrollIndicator={false}
              contentContainerClassName="gap-6 pt-2 pb-32"
              renderItem={({ item }) =>
                !isLoading ? <VideoListCard {...item} /> : <VideoListCardLoader />
              }
            //   refreshing={isFetching && page === 1 && !isLoading}
            //   onRefresh={handleRefresh}
              ListEmptyComponent={
                <EmptyState
                  title="No Likes Video"
                  description="please like a videos"
                />
              }
            />
    </SafeAreaView>
  )
}

export default LikesVideo