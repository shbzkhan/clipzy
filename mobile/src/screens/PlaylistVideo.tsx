import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import VideoListCard from '../components/VideoListCard'
import CustomHeader from '../components/Header/CustomHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Video } from '../utils/domyData'
import { FlatList } from 'react-native'
import CustomButton from '../components/CustomButton'
import { navigate } from '../navigation/NavigationUtils'
import VideoListCardLoader from '../components/Skeleton/VideoListCardLoader'
import { usePlaylistByIdQuery } from '../redux/api/playlistApi'
import GlobalLoader from '../components/GlobalLoader'
import EmptyState from '../components/EmptyState'

interface playlistProps{
  route:any
}
const PlaylistVideo:FC<playlistProps> = ({route}) => {
  const {id:playlistId} = route.params as string
  console.log("playlist id", playlistId)
  const {data, isLoading} = usePlaylistByIdQuery({playlistId})

  useEffect(()=>{
    if(!isLoading){
      console.log("playlist data", data)
    }
  },[isLoading])
  const [loading, setLoading] = useState(true)

  if(isLoading){
    return <GlobalLoader/>
  }
  return (
    <SafeAreaView className='flex-1 bg-white dark:bg-dark'>
      <CustomHeader title='Likes Playlist' />
        <FlatList
            data={!isLoading?data.data.videos:[1,2,3,4]}
            keyExtractor={(video) =>video._id}
            showsVerticalScrollIndicator={false}
            contentContainerClassName = "gap-6 pt-2 pb-14"
            renderItem={({item})=>(
              !isLoading?
              <VideoListCard {...item} />
              :
              <VideoListCardLoader/>
            )}
            ListHeaderComponent={
                <View>
                    <View className='w-full h-96 bg-red-900 relative'>
                        <View className='w-full h-full'>
                        <Image
                        source={{uri:"https://lickd.co/wp-content/uploads/2022/11/Canva-YouTube-Thumbnail-creator.jpeg"}}
                        className='w-full h-full '
                        resizeMode='cover'
                        />
                        </View>
                        <View className='absolute top-0 w-full h-full bg-black/50 backdrop-blur-3xl'/>
                        <View className='absolute top-3 w-full'>

                        
                        <TouchableOpacity className='h-52 px-4' activeOpacity={0.7}
                        onPress={()=>navigate("Video", {id:1})}
                        >
                        <Image
                        source={{uri:"https://lickd.co/wp-content/uploads/2022/11/Canva-YouTube-Thumbnail-creator.jpeg"}}
                        className='w-full h-52 rounded-xl'
                        resizeMode='cover'
                        />
                        </TouchableOpacity>
                        <View className='bg-black/25 backdrop-blur-3xl px-4 pt-5 pb-4'>
                        <Text className='text-white font-rubik-bold text-2xl'>{data?.data?.name}</Text>
                        <Text className='text-white font-rubik-semibold text-md'>{data?.data?.owner.fullname}</Text>
                        <Text className='text-white font-rubik text-sm'>{data?.data.description}</Text>
    
                            <TouchableOpacity className='bg-white w-40 py-2 items-center rounded-xl mt-2'
                            onPress={()=>navigate("Video", {id:1})}
                            >
                                <Text className='font-rubik-semibold'>Play</Text>
                            </TouchableOpacity>
                        
                        </View>
                        </View>
                    </View>
                </View>
            }
            ListEmptyComponent={
              <EmptyState/>
            }
            />
    </SafeAreaView>
  )
}

export default PlaylistVideo