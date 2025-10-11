import { useRoute } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '../components/EmptyState';
import SearchHeader from '../components/Header/SearchHeader';
import Slider from '../components/Header/Slider';
import VideoCardLoader from '../components/Skeleton/VideoCardLoader';
import VideoCard from '../components/VideoCard';
import { usePaginatedVideos } from '../hooks/usePaginatedVideos';
import { goBack, pop } from '../navigation/NavigationUtils';

const SearchVideo = () => {
  const searchInput = useRoute();
  const query = searchInput.params as string;
  const { videos, isLoading, handleLoadMore, handleRefresh, isFetching, page } =
    usePaginatedVideos({ search: query });

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-dark">
      <View className="gap-3 pb-2">
        <Pressable className="px-4" onPress={() => goBack()}>
          <SearchHeader
            value={query}
            editable={false}
            backPress={() => pop(2)}
          />
        </Pressable>
      </View>
      <FlatList
        data={!isLoading ? videos : [1, 2, 3, 4]}
        keyExtractor={video => video._id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshing={isFetching && page === 1 && !isLoading}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-6 pt-2 pb-14"
        renderItem={({ item }) =>
          !isLoading ? <VideoCard {...item} /> : <VideoCardLoader />
        }
        ListHeaderComponent={
          <View className="px-4">
            <Text className="text-primary-600 text-rubik">
              Search Result:{' '}
              <Text className="text-black/70 text-rubik dark:text-white">
                {query}
              </Text>
            </Text>
          </View>
        }
        ListFooterComponent={
          isFetching && page > 1 ? (
            <ActivityIndicator size="small" color="#2563EB" />
          ) : null
        }
        ListEmptyComponent={
          <EmptyState
            title="No Video found"
            description="please search another videos"
          />
        }
      />
    </SafeAreaView>
  );
};

export default SearchVideo;
