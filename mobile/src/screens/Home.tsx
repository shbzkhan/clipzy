import React from 'react';
import { FlatList, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from '../components/Header/HomeHeader';
import HomeSearchInput from '../components/Header/HomeSearchInput';
import VideoCardLoader from '../components/Skeleton/VideoCardLoader';
import VideoCard from '../components/VideoCard';
import { usePaginatedVideos } from '../hooks/usePaginatedVideos';

const Home = () => {
  const { videos, isLoading, handleLoadMore, handleRefresh, isFetching, page } =
    usePaginatedVideos({});

  return (
    <SafeAreaView className="bg-white dark:bg-dark">
      <View className="gap-4 mb-2">
        <HomeHeader />
        <HomeSearchInput />
      </View>
      <FlatList
        data={!isLoading ? videos : [1, 2, 3, 4]}
        keyExtractor={(video, index) => (!isLoading ? video._id : index)}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-6 pt-2 pb-32"
        renderItem={({ item }) =>
          !isLoading ? <VideoCard {...item} /> : <VideoCardLoader />
        }
        refreshing={isFetching && page === 1 && !isLoading}
        onRefresh={handleRefresh}
        ListFooterComponent={
          isFetching && page > 1 ? (
            <ActivityIndicator size="small" color="#2563EB" />
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default Home;
