import { View, Text } from 'react-native'
import React, { useState } from 'react'
import VideoListCard from '../components/VideoListCard'
import CustomHeader from '../components/Header/CustomHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Video } from '../utils/domyData'
import { FlatList } from 'react-native'

const Playlist = () => {
  const [loading, setLoading] = useState(false)
  return (
    <SafeAreaView className='flex-1 px-4 bg-white dark:bg-dark'>
      <CustomHeader title='Your Playlists' />
        <FlatList
            data={!loading?Video:[1,1,1,1]}
            keyExtractor={(video) =>video._id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerClassName = "gap-6 pt-2 pb-14"
            renderItem={({item})=>(
            //   !loading?
              <VideoListCard {...item} />
            //   :
            //   <VideoCardLoader/>
            )}
        
            />
    </SafeAreaView>
  )
}

export default Playlist