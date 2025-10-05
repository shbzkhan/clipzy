import React, { useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import CustomHeader from '../components/Header/CustomHeader'
import PlaylistCard from '../components/PlaylistCard'
import VideoListCardLoader from '../components/Skeleton/VideoListCardLoader'
import PlaylistUploader from '../components/playlist/PlaylistUploader'
import Icon from '../constants/Icons'
import { useUserPlaylistQuery } from '../redux/api/playlistApi'
import { RootState } from '../redux/store'
import EmptyState from '../components/EmptyState'

const Playlist = () => {
  const {user} = useSelector((state:RootState)=>state.user)
  const {data, isLoading, isFetching, refetch} = useUserPlaylistQuery({userId:user?._id})
  const [isCreatePlaylist, setIsCreatePlaylist] = useState<boolean>(false)
  const [isUpdatePlaylist, setIsUpdatePlaylist] = useState<boolean>(false)
  const [videoData, setVideoData] = useState<object>({
    id:null,
    name:"",
    description:""
  })
  return (
    <>
    <SafeAreaView className='flex-1 px-4 bg-white dark:bg-dark'>
      <CustomHeader title='Your Playlists' />
        <FlatList
            data={!isLoading?data.data:[1,2,3,4,5,6,7]}
            keyExtractor={(video, index) =>!isLoading?video._id:index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerClassName = "gap-6 pt-2 pb-14"
            refreshing={isFetching && !isLoading}
            onRefresh={refetch}
            renderItem={({item})=>(
              !isLoading?
              <PlaylistCard {...item}
              isCreatePlaylist={isCreatePlaylist}
              setIsCreatePlaylist={setIsCreatePlaylist}
              isUpdatePlaylist={isUpdatePlaylist}
              setIsUpdatePlaylist={setIsUpdatePlaylist}
              videoData={videoData}
              setVideoData={setVideoData}
               />
              :
              <VideoListCardLoader/>
            )}

            ListFooterComponent={
              <View className='items-center justify-center mt-4'>
                <TouchableOpacity className='p-3 border-2 rounded-full border-primary-400 dark:border-white'
                onPress={()=>setIsCreatePlaylist(true)}
                >
                <Icon name='Plus' size={38}/>
                </TouchableOpacity>
              </View>
            }
            ListEmptyComponent={
              <EmptyState
              title='No Playlist founded'
              description='please create a Playlist'
              />
            }
            />
    </SafeAreaView>
    {
    isCreatePlaylist && 
    <PlaylistUploader 
    isCreatePlaylist={isCreatePlaylist}
    setIsCreatePlaylist={setIsCreatePlaylist}
    isUpdatePlaylist={isUpdatePlaylist}
    setIsUpdatePlaylist={setIsUpdatePlaylist}
    videoData={videoData}
    setVideoData={setVideoData}
    />
    }
  </>
  )
}

export default Playlist