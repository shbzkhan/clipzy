import React, { useState } from 'react'
import CustomHeader from '../components/Header/CustomHeader'
import { Video } from '../utils/domyData'
import VideoListCard from '../components/VideoListCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native'

const YourVideo = () => {
  const [loading, setLoading] = useState(false)
  return (
    <SafeAreaView className='flex-1 px-4 bg-white dark:bg-dark'>
      <CustomHeader title='Your Videos' />
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

export default YourVideo