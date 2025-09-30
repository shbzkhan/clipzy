import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from '../constants/Icons'
import {useChannelQuery, } from '../redux/api/authApi'
import { MaterialTabBar, Tabs,ScrollView } from 'react-native-collapsible-tab-view'
import PlaylistCard from '../components/PlaylistCard'
import VideoListCardLoader from '../components/Skeleton/VideoListCardLoader'
import VideoListCard from '../components/VideoListCard'
import GlobalLoader from '../components/GlobalLoader'
import ChannelHeader from '../components/ChannelDetails'
import { Video } from '../types/video'
import { useGetVideosQuery } from '../redux/api/videoApi'
import { StyleSheet, useColorScheme } from 'nativewind'

const HEADER_HEIGHT = 250

const Channel = ({route}) => {

  const {colorScheme} = useColorScheme()
const channelD = route.params as string
const channelId = channelD.channelId
  const [loading, setLoading] = useState(false)
  const {data:channelData, isLoading:channelLoading} = useChannelQuery({channelId})

  //channel video
  const [page, setPage] = useState<number>(1);
    const [videos, setVideos] = useState<Video[]>([]);
    const { data, isLoading:channelVideoLoading, isFetching } = useGetVideosQuery({page, userId:channelData?.data._id});
  
    useEffect(()=>{
      if(page === 1){
        setVideos(data?.docs)
      }else{
        const combinedVideos = page === 1 ? data?.docs : [...videos, ...data?.docs];
          const uniqueVideo = Array.from(new Map(combinedVideos?.map(video => [video._id, video])).values());
        setVideos(uniqueVideo);
      }
    },[data,page])
  
  
    const handleLoadMore = () => {
      if (!isFetching && data?.hasNextPage) {
        setPage((prev) => prev + 1);
      }
    };
  

  if(channelVideoLoading || channelLoading){
    return <GlobalLoader/>
  }
  return (
     <Tabs.Container
      renderHeader={() => <ChannelHeader user={channelData?.data} totalVideos ={data?.totalDocs} />}
      headerHeight={HEADER_HEIGHT}
      revealHeaderOnScroll={true}
      snapThreshold={0.5}
      containerStyle={{backgroundColor:colorScheme === "dark"?"#071825":"#ffffff"}}
      headerContainerStyle={{backgroundColor:colorScheme === "dark"?"#071825":"#ffffff"}}
      renderTabBar={(props) => (
    <MaterialTabBar
       {...props}
      activeColor="#2563EB"
      inactiveColor={colorScheme === "dark"?"#ffffff":"black"}
      indicatorStyle={{ backgroundColor: '#2563EB', height: 3 }}
      contentContainerStyle={{ flex:1, justifyContent:"space-between", alignContent:"center", padding:8}}
      labelStyle={{ fontWeight: 'bold', textAlign: 'center' }}
    />
     )}
    >
      <Tabs.Tab name="Videos">
        <Tabs.FlatList
          data={!channelVideoLoading?videos:[1,2,3,4]}
          keyExtractor={(video, index) =>!channelVideoLoading?video._id:index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginTop:30, paddingHorizontal:12}}
          contentContainerClassName = "gap-6 pt-2 pb-32"
          renderItem={({item})=>(
          !channelVideoLoading?
        <VideoListCard {...item} />
        :
      <VideoListCardLoader/>
    )}
    />
      </Tabs.Tab>
      <Tabs.Tab name="Playlist">
        <Tabs.FlatList
                    data={!loading?Video:[1,2,3,4,5,6,7,8,9]}
                    keyExtractor={(video) =>video._id}
                    showsVerticalScrollIndicator={false}
                    contentContainerClassName = "gap-6 pt-2 pb-14"
                    renderItem={({item})=>(
                      !loading?
                      <PlaylistCard {...item} />
                      :
                      <VideoListCardLoader/>
                    )}
        
                    ListFooterComponent={
                      <View className='justify-center items-center mt-4'>
                        <TouchableOpacity className='border-2 border-primary-400 dark:border-white rounded-full p-3'>
                        <Icon name='Plus' size={38}/>
                        </TouchableOpacity>
                      </View>
                    }
                    />
      </Tabs.Tab>
      <Tabs.Tab name="Post">
        <ScrollView className='bg-white'>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
        </ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  )
}
export default Channel