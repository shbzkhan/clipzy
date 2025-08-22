import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { FC } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Video } from '../utils/domyData'
import VideoCard from '../components/VideoCard'
import CustomButton from '../components/CustomButton'
import SubscribedButton from '../components/SubscribedButton'
import VideoPlayer from '../components/VideoPlayer'

interface videoDetailsProps{
  route:any
}
const VideoDetails:FC<videoDetailsProps> = ({route}) => {
  const insets = useSafeAreaInsets();
const video = route.params
  console.log(video)
  return (
    <SafeAreaView className='flex-1'>
      <VideoPlayer/>

    <FlatList
    data={Video}
    keyExtractor={video =>video._id}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={[{ paddingBottom: insets.bottom + 56,}]}
    contentContainerClassName = "gap-6 pt-2"
    renderItem={({item})=>(
      <VideoCard {...item} />
      // <VideoCardLoader/>
    )}

    ListHeaderComponent={
      <View className='px-3 gap-2'>
        <TouchableOpacity>
          <Text className='text-black font-bold text-xl' numberOfLines={2}>This is name of this area so that provide a simple name of this area of cercle</Text>
          <Text className='text-gray-600 text-xs'>285k views  4w ago  #TheMemoryAboutYou <Text className='font-semibold text-black'>...more</Text></Text>
        </TouchableOpacity>
        <TouchableOpacity className='flex-row items-center justify-between'>
          <View className='flex-row items-center gap-1'>
          <View className='w-12 h-12 rounded-full'>
            <Image
              source={{uri:"https://api.dicebear.com/9.x/initials/png?seed=Z Khan"}}
              className='w-12 h-12 rounded-full '
              resizeMode='cover'
              />
          </View>
          <Text className='font-medium'>Shahbaz Khan</Text>
          <Text className='text-sm text-gray-500'>348k</Text>
          </View>
          <SubscribedButton
          isSubscribed={true}
          />
          
        </TouchableOpacity>
      </View>
    }

    />
    </SafeAreaView>
  )
}

export default VideoDetails