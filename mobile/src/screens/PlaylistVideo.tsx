import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { FC, useState } from 'react'
import VideoListCard from '../components/VideoListCard'
import CustomHeader from '../components/Header/CustomHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Video } from '../utils/domyData'
import { FlatList } from 'react-native'
import CustomButton from '../components/CustomButton'
import { navigate } from '../navigation/NavigationUtils'
import VideoListCardLoader from '../components/Skeleton/VideoListCardLoader'

interface playlistProps{
  route:any
}
const PlaylistVideo:FC<playlistProps> = ({route}) => {
    const video = route.params
  const [loading, setLoading] = useState(true)
  return (
    <SafeAreaView className='flex-1 bg-white dark:bg-dark'>
      <CustomHeader title='Likes Playlist' />
        <FlatList
            data={!loading?Video:[1,2,3,4]}
            keyExtractor={(video) =>video._id}
            showsVerticalScrollIndicator={false}
            contentContainerClassName = "gap-6 pt-2 pb-14"
            renderItem={({item})=>(
              !loading?
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
                        <Text className='text-white font-rubik-bold text-2xl'>Watch Later</Text>
                        <Text className='text-white font-rubik-semibold text-md'>Shahbaz Khan</Text>
                        <Text className='text-white font-rubik text-sm'>31 videos</Text>
    
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
            />
    </SafeAreaView>
  )
}

export default PlaylistVideo