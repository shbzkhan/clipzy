import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Video } from '../utils/domyData';
import VideoCard from '../components/VideoCard';
import CustomButton from '../components/CustomButton';
import SubscribedButton from '../components/SubscribedButton';
import VideoPlayer from '../components/VideoPlayer';
import CustomVideoSliderCard from '../components/CustomVideoSliderCard';
import { ToastShow } from '../utils/Tost';
import { navigate } from '../navigation/NavigationUtils';
import { SheetManager } from 'react-native-actions-sheet';
import UserLogo from '../components/UserLogo';
import VideoCardLoader from '../components/Skeleton/VideoCardLoader';
import { useGetVideoByIdQuery,} from '../redux/api/videoApi';
import AuthBox from '../components/AuthBox';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import GlobalLoader from '../components/GlobalLoader';
import { timeAgo } from '../constants/TimeAgo';
import { useToggleLikeMutation } from '../redux/api/likeApi';
import { usePaginatedVideos } from '../hooks/usePaginatedVideos';
import { handleShareToSocialMedia } from '../utils/ShareToSocialMedia';
import { ChevronsLeftIcon } from 'lucide-react-native';
import { useToggleConnetionMutation } from '../redux/api/connectionApi';
import ChannelBox from '../components/ChannelBox';

const VideoDetails: FC = ({ route }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const insets = useSafeAreaInsets();
  const video = route.params as string;
  const videoId = video.id;
  const { data, isLoading } = useGetVideoByIdQuery({ videoId });
   const [isLiked, setIsLiked] = useState(false);
   const [like, setLike] = useState(0);

  //apis
  const {videos, isLoading:loading, isFetching, handleLoadMore, page} = usePaginatedVideos({})
  const [toggleLike] = useToggleLikeMutation()
  
  useEffect(()=>{
    if(!isLoading){
      setIsLiked(data?.data.isLiked)
      setLike(data?.data.likesCount)
    }
  },[isLoading])
  
  const isLikedHandle = async() => {
      try {
      if (isLiked) {
      setLike(like - 1);
      setIsLiked(false);
    } else {
      setLike(like + 1);
      setIsLiked(true);
    }
        const toggledLike = await toggleLike(videoId).unwrap()
        setIsLiked(toggledLike.data.liked)
        console.log(toggledLike.data)
      } catch (error) {
        setIsLiked(false)
        setLike(like - 1)
        console.log("error message",error.message)
        ToastShow(error.data.message)
      }

  };

  if (!user) return <AuthBox name="Video Creation" />;

  if (isLoading) {
    return <GlobalLoader />;
  }
  return (
    <>
      <SafeAreaView
        edges={['bottom', 'top']}
        className="flex-1 bg-white dark:bg-dark"
      >
        <VideoPlayer data={data?.data} />

        <FlatList
          data={!loading ? videos : [1, 1, 1, 1]}
          keyExtractor={item => item._id}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[{ paddingBottom: insets.bottom + 56 }]}
          contentContainerClassName="gap-6 pt-2"
          renderItem={({ item }) =>
            !loading ? <VideoCard {...item} /> : <VideoCardLoader />
          }
          ListFooterComponent={
            isFetching && page > 1 ? (
              <ActivityIndicator size="small" color="#2563EB" />
            ) : null
          }
          ListHeaderComponent={
            <View className="gap-4 px-3">
              <TouchableOpacity
                onPress={() => {
                  SheetManager.show('description-sheet', {
                    payload: {
                      entityId: data?.data,
                    },
                  });
                }}
              >
                <Text
                  className="text-xl text-black font-rubik-bold dark:text-white"
                  numberOfLines={2}
                >
                  {data?.data.title}
                </Text>
                <Text className="text-xs text-gray-600 font-rubik dark:text-gray-300">
                  {data?.data.views +
                    ' views  ' +
                    timeAgo(data?.data.createdAt)}
                  <Text className="text-black font-rubik-semibold dark:text-white">
                    ...more
                  </Text>
                </Text>
              </TouchableOpacity>
              <ChannelBox item={data.data.owner}/>
              <ScrollView
                horizontal
                contentContainerClassName="gap-4 py-2"
                showsHorizontalScrollIndicator={false}
              >
                <CustomVideoSliderCard
                  title={like}
                  icon="Heart"
                  focused={isLiked}
                  handlePress={isLikedHandle}
                />
                <CustomVideoSliderCard
                  title="Share"
                  icon="Share"
                  handlePress={()=>handleShareToSocialMedia({
                      message:data?.data.title,
                      url_id:videoId
                    }
                  )}
                />
                <CustomVideoSliderCard
                  title="Save"
                  icon="Pin"
                  handlePress={() => {
                    SheetManager.show('playlist-sheet', {
                      payload: {
                        entityId: videoId,
                      },
                    });
                  }}
                />
                <CustomVideoSliderCard
                  title="Download"
                  icon="ArrowDownToLine"
                  handlePress={() => ToastShow('Downloaded', 'success')}
                />
                <CustomVideoSliderCard
                  title="Thanks"
                  icon="ShipWheel"
                  handlePress={() => ToastShow('Thanks for Click', 'success')}
                />
              </ScrollView>

              <TouchableOpacity
                className="gap-2 px-4 py-3 mt-3 mb-5 bg-secondary rounded-xl dark:bg-dark-100"
                onPress={() => {
                  SheetManager.show('comment-sheet', {
                    payload: {
                      entityId: videoId,
                    },
                  });
                }}
              >
                <Text className="font-rubik-semibold dark:text-white">
                  Comments
                </Text>
                <View className="flex-row items-center gap-2">
                  <UserLogo
                    uri={data?.data?.owner.avatar}
                    heightAndWidth={6}
                  />
                  <Text className="text-sm text-gray-500 font-rubik dark:text-gray-300">
                    {data?.data?.owner.fullname + ' please write a comment'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          }
        />
      </SafeAreaView>
    </>
  );
};

export default VideoDetails;
