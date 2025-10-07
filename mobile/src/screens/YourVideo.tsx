import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import EmptyState from '../components/EmptyState';
import CustomHeader from '../components/Header/CustomHeader';
import VideoListCardLoader from '../components/Skeleton/VideoListCardLoader';
import VideoListCard from '../components/VideoListCard';
import { RootState } from '../redux/store';
import { usePaginatedVideos } from '../hooks/usePaginatedVideos';

const YourVideo = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const { videos, isLoading, handleLoadMore, handleRefresh, isFetching, page } = usePaginatedVideos({userId:user?._id});
  console.log(videos)

  return (
    <SafeAreaView className="flex-1 px-3 bg-white dark:bg-dark">
      <CustomHeader title="Your Videos" />
      <FlatList
        data={!isLoading ? videos : [1, 2, 3, 4, 5, 6]}
        keyExtractor={(video, index) =>
          !isLoading ? video._id : index.toString()
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-6 pt-2 pb-32"
        renderItem={({ item }) =>
          !isLoading ? <VideoListCard {...item} /> : <VideoListCardLoader />
        }
        refreshing={isFetching && page === 1 && !isLoading}
        onRefresh={handleRefresh}
        ListFooterComponent={
          isFetching && page > 1 ? (
            <ActivityIndicator size="small" color="#2563EB" />
          ) : null
        }
        ListEmptyComponent={
          <EmptyState
            title="No Video Published You"
            description="please published a videos"
          />
        }
      />
    </SafeAreaView>
  );
};

export default YourVideo;
