import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomHeader from '../components/Header/CustomHeader'
import VideoListCard from '../components/VideoListCard'
import { Video } from '../utils/domyData'

const WatchHistory = () => {
    const [loading, setLoading] = useState(false)
  return (
    <SafeAreaView className='flex-1 px-4 bg-white dark:bg-dark'>
      <CustomHeader title='Watch History' />
        <FlatList
            data={!loading?Video:[1,1,1,1]}
            keyExtractor={(video) =>video._id}
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

export default WatchHistory