import { useRoute } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import React from 'react';
import {
  MaterialTabBar,
  Tabs
} from 'react-native-collapsible-tab-view';
import ChannelHeader from '../components/ChannelDetails';
import EmptyState from '../components/EmptyState';
import GlobalLoader from '../components/GlobalLoader';
import PlaylistCard from '../components/PlaylistCard';
import VideoListCardLoader from '../components/Skeleton/VideoListCardLoader';
import TweetCard from '../components/Tweet/TweetCard';
import VideoListCard from '../components/VideoListCard';
import { usePaginatedVideos } from '../hooks/usePaginatedVideos';
import { useChannelQuery } from '../redux/api/authApi';
import { useUserPlaylistQuery } from '../redux/api/playlistApi';
import { useUserTweetQuery } from '../redux/api/tweetApi';

const HEADER_HEIGHT = 250;

const Channel = () => {
  const route = useRoute();
  const { colorScheme } = useColorScheme();
  const { channelId } = route.params as string | any;
  const { data: channelData, isLoading: channelLoading } = useChannelQuery({
    channelId,
  });
  const {
    videos,
    isLoading: channelVideoLoading,
    handleLoadMore,
    totalVideos,
  } = usePaginatedVideos({ userId: channelData?.data?._id });
  const { data: playlistData, isLoading: channelPlaylistLoading } =
    useUserPlaylistQuery({ userId: channelData?.data?._id });
  const { data: tweetData } = useUserTweetQuery({
    userId: channelData?.data._id,
  });

  if (channelVideoLoading || channelLoading) {
    return <GlobalLoader />;
  }
  return (
    <Tabs.Container
      renderHeader={() => (
        <ChannelHeader user={channelData?.data} totalVideos={totalVideos} />
      )}
      headerHeight={HEADER_HEIGHT}
      revealHeaderOnScroll={true}
      snapThreshold={0.5}
      containerStyle={{
        backgroundColor: colorScheme === 'dark' ? '#071825' : '#ffffff',
      }}
      headerContainerStyle={{
        backgroundColor: colorScheme === 'dark' ? '#071825' : '#ffffff',
      }}
      renderTabBar={props => (
        <MaterialTabBar
          {...props}
          activeColor="#2563EB"
          inactiveColor={colorScheme === 'dark' ? '#ffffff' : 'black'}
          indicatorStyle={{ backgroundColor: '#2563EB', height: 3 }}
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'space-between',
            alignContent: 'center',
            padding: 8,
          }}
          labelStyle={{ fontWeight: 'bold', textAlign: 'center' }}
        />
      )}
    >
      <Tabs.Tab name="Videos">
        <Tabs.FlatList
          data={!channelVideoLoading ? videos : [1, 2, 3, 4]}
          keyExtractor={(video, index) =>
            !channelVideoLoading ? video._id : index.toString()
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="gap-6 pt-2 pb-32 mt-5 mx-3"
          renderItem={({ item }) =>
            !channelVideoLoading ? (
              <VideoListCard {...item} />
            ) : (
              <VideoListCardLoader />
            )
          }
        />
      </Tabs.Tab>
      <Tabs.Tab name="Playlists">
        <Tabs.FlatList
          data={
            !channelPlaylistLoading ? playlistData?.data : [1, 2, 3, 4, 5, 6, 7]
          }
          keyExtractor={(video, index) =>
            !channelPlaylistLoading ? video._id : index.toString()
          }
          showsVerticalScrollIndicator={false}
          contentContainerClassName="gap-6 pt-2 pb-32 mt-7 px-3"
          renderItem={({ item }) =>
            !channelPlaylistLoading ? (
              <PlaylistCard {...item} />
            ) : (
              <VideoListCardLoader />
            )
          }
        />
      </Tabs.Tab>
      <Tabs.Tab name="Tweets">
        <Tabs.FlatList
          data={tweetData}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="gap-8 pt-2 pb-8 mt-7 px-3 pb-8"
          renderItem={({ item }) => <TweetCard item={item} />}
          ListEmptyComponent={
            <EmptyState
              title="No Tweet Uploaded"
              description="please refresh after some time"
            />
          }
        />
      </Tabs.Tab>
    </Tabs.Container>
  );
};
export default Channel;
