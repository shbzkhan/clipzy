import { View, Text, Image, TouchableOpacity, FlatList, ScrollView, ActivityIndicator, Pressable } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Video } from '../utils/domyData'
import VideoCard from '../components/VideoCard'
import CustomButton from '../components/CustomButton'
import SubscribedButton from '../components/SubscribedButton'
import VideoPlayer from '../components/VideoPlayer'
import { VideoSlider } from '../utils/VideoSliderData'
import CustomVideoSliderCard from '../components/CustomVideoSliderCard'
import { ToastShow } from '../utils/Tost'
import { navigate } from '../navigation/NavigationUtils'
import Slider from '../components/Header/Slider'
import { SheetManager } from 'react-native-actions-sheet'
import UserLogo from '../components/UserLogo'
import VideoCardLoader from '../components/Skeleton/VideoCardLoader'
import { useGetVideoByIdQuery, useGetVideosQuery } from '../redux/api/videoApi'
import AuthBox from '../components/AuthBox'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import GlobalLoader from '../components/GlobalLoader'
import { timeAgo } from '../constants/TimeAgo'
// import { Video, Video } from '../types/video'

interface videoDetailsProps{
  route:any
}
const VideoDetails:FC<videoDetailsProps> = ({route}) => {
  const user = useSelector((state:RootState)=>state.user.user)
  const insets = useSafeAreaInsets();
  //  const [loading, setLoading] = useState(true)
const video = route.params as string
const videoId = video.id 
// console.log("video id", videoId)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [like, setLike] =useState<number>(435)
  const {data, isLoading, error}= useGetVideoByIdQuery({videoId})
  //allvideofetch
  const [page, setPage] = useState<number>(1);
  const [videos, setVideos] = useState<Video[]>([]);
  const { data:videoData, isLoading:loading, isFetching } = useGetVideosQuery({page});
  
    useEffect(()=>{
      if(page === 1){
        setVideos(videoData?.docs)
      }else{
        setVideos((prev) => [...prev, ...videoData?.docs]);
      }
    },[videoData,page])
  
    const handleLoadMore = () => {
      if (!isFetching && videoData?.hasNextPage) {
        setPage((prev) => prev + 1);
      }
    };
    
 

  const isLikedHandle = ()=>{
    if(isLiked){
      setLike(like-1)
      setIsLiked(false)
      ToastShow("Unliked","success")
    }else{
      setLike(like+1)
      setIsLiked(true)
      ToastShow("Liked","success")

    }
  }

  let comment = "Waiting for the blink it zomato and other video with new names"
  if(!user) return <AuthBox name="Video Creation"/>
  if(isLoading){
    return <GlobalLoader/>
  }
  return (
    <>
    <SafeAreaView edges={['bottom', "top"]} className='flex-1 bg-white dark:bg-dark'>
    <VideoPlayer data={data?.data}/>

    <FlatList
    data={!loading?videos:[1,1,1,1]}
    keyExtractor={item =>item._id}
    onEndReached={handleLoadMore}
    onEndReachedThreshold={0.5}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={[{ paddingBottom: insets.bottom + 56,}]}
    contentContainerClassName = "gap-6 pt-2"
    renderItem={({item})=>(
       !loading?
      <VideoCard {...item} />
      :
      <VideoCardLoader/>
    )}

     ListFooterComponent={
            isFetching && page > 1 ? (
              <ActivityIndicator size="small" color="#2563EB" />
            ) : null
          }

    ListHeaderComponent={
      <View className='px-3 gap-4'>
        <TouchableOpacity
        onPress={()=>{
            SheetManager.show("description-sheet",{
            payload:{
              entityId:data?.data,
            }
          })
        }}
        >
          <Text className='text-black font-rubik-bold text-xl dark:text-white' numberOfLines={2}>{data?.data.title}</Text>
          <Text className='text-gray-600 text-xs font-rubik dark:text-gray-300'>{data?.data.views + " views  " + timeAgo(data?.data.createdAt) +" ago  #TheMemoryAboutYou" }<Text className='font-rubik-semibold text-black dark:text-white'>...more</Text></Text>
        </TouchableOpacity>
        <Pressable className='flex-row items-center justify-between'
        onPress={()=>navigate("Channel",{
          id:data?.data?.owner._id
        })}
        >
          <View className='flex-row items-center gap-1'>
          <UserLogo
            uri={data?.data?.owner.avatar}
            handlePress={()=>navigate("Channel",{
                  id:data?.data?.owner._id
              })}
          />
          <Text className='font-rubik-medium dark:text-white'>{data?.data.owner.fullname}</Text>
          <Text className='text-sm font-rubik text-gray-500 dark:text-gray-300'>{data?.data.owner.subscribersCount}</Text>
          </View>
          <SubscribedButton
          isSubscribed={data?.data.owner.isSubscribed}
          />
        </Pressable>
          <ScrollView
          horizontal
          contentContainerClassName='gap-4 py-2'
          showsHorizontalScrollIndicator={false}
          >
            <CustomVideoSliderCard title={data?.data.likesCount} icon="Heart" focused={isLiked} handlePress={isLikedHandle}/>
            <CustomVideoSliderCard title="Share" icon="Share" handlePress={()=>ToastShow("Shared","success")}/>
            <CustomVideoSliderCard title="Download" icon="ArrowDownToLine" handlePress={()=>ToastShow("Downloaded","success")}/>
            <CustomVideoSliderCard title="Save" icon="Pin" handlePress={()=>ToastShow("Saved","success")}/>
            <CustomVideoSliderCard title="Thanks" icon="ShipWheel" handlePress={()=>ToastShow("Thanks for Click","success")}/>
          </ScrollView>

          <TouchableOpacity className='bg-secondary px-4 py-3 rounded-xl gap-2 mt-3 mb-5 dark:bg-dark-100'
          onPress={()=>{
            SheetManager.show("comment-sheet",{
            payload:{
              entityId:"hello",
            }
          })
        }}
          >
            <Text className='font-rubik-semibold dark:text-white'>Comments</Text>
            <View className='flex-row gap-2 items-center'>
              <UserLogo
                uri={"https://api.dicebear.com/9.x/initials/png?seed=Z Khan"}
                heightAndWidth={6}
              />
            <Text className='text-gray-500 font-rubik text-sm dark:text-gray-300' >{comment.slice(0,45)+"..."}</Text>
            </View>
          </TouchableOpacity>
      </View>
    }

    />
    </SafeAreaView>
    </>
  )
}

export default VideoDetails