import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomHeader from '../components/Header/CustomHeader'
import VideoListCard from '../components/VideoListCard'
import VideoListCardLoader from '../components/Skeleton/VideoListCardLoader'
import { useWatchHistoryQuery } from '../redux/api/authApi'

const WatchHistory = () => {
  const {data, isLoading} = useWatchHistoryQuery()
  return (
    <SafeAreaView className='flex-1 bg-white dark:bg-dark px-3'>
     <CustomHeader title='Watch Historys' />
        <FlatList
            data={!isLoading?data?.data:[1,2,3,4,5,6,7,8,9]}
            keyExtractor={(video, index) =>!isLoading?video?._id:index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerClassName = "gap-6 pt-2 pb-14 pt-2"
            renderItem={({item})=>(
              !isLoading?
              <VideoListCard {...item} />
              :
              <VideoListCardLoader/>
            )}
        
            />
    </SafeAreaView>
  )
}

export default WatchHistory