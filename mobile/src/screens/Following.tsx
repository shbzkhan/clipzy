import { View, Text, FlatList} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeHeader from '../components/Header/HomeHeader'
import UserLogo from '../components/UserLogo'
import { useFollowingConnetionQuery } from '../redux/api/connectionApi'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import GlobalLoader from '../components/GlobalLoader'
import { navigate } from '../navigation/NavigationUtils'
import VideoCard from '../components/VideoCard'
import VideoListCard from '../components/VideoListCard'

const Following = () => {
  const {user} = useSelector((state:RootState)=>state.user)
  const {data,isLoading} = useFollowingConnetionQuery(user?._id)

  if(isLoading){
    return <GlobalLoader/>
  }
  return (
    <SafeAreaView edges={["top","right","left"]} className='flex-1 bg-white dark:bg-dark'>
      <HomeHeader/>
      <View className='flex-row flex-1 gap-2'>
      <View className='w-[17%] bg-secondary pt-4 px-1 dark:bg-dark-200'>
        <FlatList
        data={data}
        keyExtractor={item=>item._id}
        contentContainerClassName='gap-5'
        showsVerticalScrollIndicator={false}
        renderItem={({item})=>(
          <UserLogo
          heightAndWidth={16}
          handlePress={()=>navigate("Channel",{channelId:item.username})}
          uri={item.avatar}
          />
          
        )}
        />
      </View>
      <View className='flex-1 pr-2'>
        <FlatList
        data={data}
        keyExtractor={item=>item._id}
        contentContainerClassName='gap-5'
        showsVerticalScrollIndicator={false}
        renderItem={({item})=>(
          <VideoListCard
            _id ={item.lastVideo._id}
            title ={item.lastVideo.title} 
            thumbnail ={item.lastVideo.thumbnail} 
            views ={item.lastVideo.views}
            owner={item}
          />
        )}
        ListHeaderComponent={
          <View>
            <Text className='text-2xl text-center font-rubik-bold dark:text-white'>Last Videos</Text>
          </View>
        }
        />
      </View>
      </View>
    </SafeAreaView>
  )
}

export default Following