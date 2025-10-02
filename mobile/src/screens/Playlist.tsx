import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../components/Header/CustomHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Video } from '../utils/domyData'
import { FlatList } from 'react-native'
import PlaylistCard from '../components/PlaylistCard'
import Icon from '../constants/Icons'
import VideoListCardLoader from '../components/Skeleton/VideoListCardLoader'
import PlaylistUploader from '../components/playlist/PlaylistUploader'
import { useUserPlaylistQuery } from '../redux/api/playlistApi'
import { RootState } from '../redux/store'
import { useSelector } from 'react-redux'

const Playlist = () => {
  const [loading, setLoading] = useState(false)
  const {user} = useSelector((state:RootState)=>state.user)
  console.log("userid", user._id)
    const {data, isLoading, isFetching, refetch} = useUserPlaylistQuery({userId:user?._id})
  const [isCreatePlaylist, setIsCreatePlaylist] = useState<boolean>(false)
  return (
    <>
    <SafeAreaView className='flex-1 px-4 bg-white dark:bg-dark'>
      <CustomHeader title='Your Playlists' />
        <FlatList
            data={!isLoading?data.data:[1,2,3,4,5,6,7]}
            keyExtractor={(video, index) =>!isLoading?video._id:index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerClassName = "gap-6 pt-2 pb-14"
            renderItem={({item})=>(
              !isLoading?
              <PlaylistCard {...item} />
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
            />
    </SafeAreaView>
    {isCreatePlaylist && <PlaylistUploader setIsCreatePlaylist={setIsCreatePlaylist}/>}
  </>
  )
}

export default Playlist