import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomHeader from '../components/Header/CustomHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Video } from '../utils/domyData'
import { FlatList } from 'react-native'
import PlaylistCard from '../components/PlaylistCard'
import Icon from '../constants/Icons'
import PlaylistUploader from '../components/playlist/playlistUploader'
import VideoListCardLoader from '../components/Skeleton/VideoListCardLoader'

const Playlist = () => {
  const [loading, setLoading] = useState(false)
  return (
    <SafeAreaView className='flex-1 px-4 bg-white dark:bg-dark'>
      <CustomHeader title='Your Playlists' />
        <FlatList
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
    </SafeAreaView>
  )
}

export default Playlist