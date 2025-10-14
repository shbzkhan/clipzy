import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import VideoListCard from '../components/VideoListCard';
import CustomHeader from '../components/Header/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video } from '../utils/domyData';
import { FlatList } from 'react-native';
import CustomButton from '../components/CustomButton';
import { navigate } from '../navigation/NavigationUtils';
import VideoListCardLoader from '../components/Skeleton/VideoListCardLoader';
import { usePlaylistByIdQuery, usePlaylistDeleteVideoMutation } from '../redux/api/playlistApi';
import GlobalLoader from '../components/GlobalLoader';
import EmptyState from '../components/EmptyState';
import { ToastShow } from '../utils/Tost';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface playlistProps {
  route: any;
}
const PlaylistVideo: FC<playlistProps> = ({ route }) => {
  const { id: playlistId } = route.params as string;
  const {user} = useSelector((state:RootState)=>state.user)
  const { data, isLoading,} = usePlaylistByIdQuery({ playlistId });


 
  if (isLoading) {
    return <GlobalLoader />;
  }
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-dark">
      <CustomHeader title="Likes Playlist" />
      <FlatList
        data={!isLoading ? data?.data?.videos : [1, 2, 3, 4]}
        keyExtractor={(item, index) => !isLoading?item._id:index}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-6 pt-2 pb-14"
        renderItem={({ item }) =>
          !isLoading ? (
            <View className="px-3">
              <VideoListCard {...item} isPlaylist={data?.data?.owner._id === user?._id} playlistId={data?.data?._id} />
              
            </View>
          ) : (
            <VideoListCardLoader />
          )
        }
        ListHeaderComponent={
          <View>
            <View className="relative w-full bg-red-900 h-96">
              <View className="w-full h-full">
                <Image
                  source={{
                    uri: data?.data?.videos[0]?.thumbnail || 'https://lickd.co1/wp-content/uploads/2022/11/Canva-YouTube-Thumbnail-creator.jpeg',
                  }}
                  className="w-full h-full "
                  resizeMode="cover"
                />
              </View>
              <View className="absolute top-0 w-full h-full bg-black/50 backdrop-blur-3xl" />
              <View className="absolute w-full top-3">
                <TouchableOpacity
                  className="px-4 h-52"
                  activeOpacity={0.7}
                  disabled={!(data?.data?.videos[0]?._id)}
                  onPress={() => navigate('Video', { id: data?.data?.videos[0]?._id || "" })}
                >
                  <Image
                    source={{
                      uri: data?.data?.videos[0]?.thumbnail || 'https://lickd.co/wp-content/uploads/2022/11/Canva-YouTube-Thumbnail-creator.jpeg',
                    }}
                    className="w-full h-52 rounded-xl"
                    resizeMode="cover"
                  />
                </TouchableOpacity>
                <View className="px-4 pt-5 pb-4 bg-black/25 backdrop-blur-3xl">
                  <Text className="text-2xl text-white font-rubik-bold">
                    {data?.data?.name}
                  </Text>
                  <Text className="text-white font-rubik-semibold text-md">
                    {data?.data?.owner.fullname}
                  </Text>
                  <Text className="text-sm text-white font-rubik">
                    {data?.data.description}
                  </Text>

                  <TouchableOpacity
                    className="items-center w-40 py-2 mt-2 bg-white rounded-xl"
                    onPress={() => navigate('Video', { id:data?.data?.videos[0]?._id })}
                  >
                    <Text className="font-rubik-semibold">Play</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        }
        ListEmptyComponent={
        <EmptyState
          title='No Video added Yet'
          description='please add video in this  Playlist'
          />
      }
      />
    </SafeAreaView>
  );
};

export default PlaylistVideo;
