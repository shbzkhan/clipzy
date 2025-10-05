import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import EmptyState from '../components/EmptyState';
import CustomHeader from '../components/Header/CustomHeader';
import VideoListCardLoader from '../components/Skeleton/VideoListCardLoader';
import VideoListCard from '../components/VideoListCard';
import { useGetVideosQuery } from '../redux/api/videoApi';
import { RootState } from '../redux/store';
import { Video } from '../types/video';

const YourVideo = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [page, setPage] = useState<number>(1);
  const [videos, setVideos] = useState<Video[]>([]);
  const { data, isLoading, isFetching, refetch } = useGetVideosQuery({
    page,
    userId: user?._id,
  });

  useEffect(() => {
    if (page === 1) {
      setVideos(data?.docs);
    } else {
      const combinedVideos =
        page === 1 ? data?.docs : [...videos, ...data?.docs];
      const uniqueVideo = Array.from(
        new Map(combinedVideos?.map(video => [video._id, video])).values(),
      );
      setVideos(uniqueVideo);
    }
  }, [data, page]);

  const handleRefresh = () => {
    setPage(1);
    refetch();
  };

  const handleLoadMore = () => {
    if (!isFetching && data?.hasNextPage) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <SafeAreaView className="flex-1 px-4 bg-white dark:bg-dark">
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
