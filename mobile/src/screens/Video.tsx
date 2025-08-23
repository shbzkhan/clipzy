import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { FC, useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Video } from '../utils/domyData'
import VideoCard from '../components/VideoCard'
import CustomButton from '../components/CustomButton'
import SubscribedButton from '../components/SubscribedButton'
import VideoPlayer from '../components/VideoPlayer'
import { VideoSlider } from '../utils/VideoSliderData'
import CustomVideoSliderCard from '../components/CustomVideoSliderCard'
import { ToastShow } from '../utils/Tost'
import { navigate } from '../navigation/NavigationUtils'
import Slider from '../components/Header/Slider'

interface videoDetailsProps{
  route:any
}
const VideoDetails:FC<videoDetailsProps> = ({route}) => {
  const insets = useSafeAreaInsets();
const video = route.params
  console.log(video)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [like, setLike] =useState<number>(435)

  const isLikedHandle = ()=>{
    if(isLiked){
      setLike(like-1)
      setIsLiked(false)
      ToastShow("Unliked","success")
    }else{
      setLike(like+1)
      setIsLiked(true)
      ToastShow("Liked","success")

    }
  }

  let comment = "Waiting for the blink it zomato and other video with new names"
  return (
    <SafeAreaView className='flex-1 bg-white'>
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
          <Text className='text-black font-rubik-bold text-xl' numberOfLines={2}>This is name of this area so that provide a simple name of this area of cercle</Text>
          <Text className='text-gray-600 text-xs font-rubik'>285k views  4w ago  #TheMemoryAboutYou <Text className='font-rubik-semibold text-black'>...more</Text></Text>
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
          <Text className='font-rubik-medium'>Shahbaz Khan</Text>
          <Text className='text-sm font-rubik text-gray-500'>348k</Text>
          </View>
          <SubscribedButton
          isSubscribed={false}
          />
        </TouchableOpacity>
          <ScrollView
          horizontal
          contentContainerClassName='gap-4 py-2'
          showsHorizontalScrollIndicator={false}
          >
            <CustomVideoSliderCard title={like} icon="Heart" focused={isLiked} handlePress={isLikedHandle}/>
            <CustomVideoSliderCard title="Share" icon="Share" handlePress={()=>ToastShow("Shared","success")}/>
            <CustomVideoSliderCard title="Download" icon="ArrowDownToLine" handlePress={()=>ToastShow("Downloaded","success")}/>
            <CustomVideoSliderCard title="Save" icon="Pin" handlePress={()=>ToastShow("Saved","success")}/>
            <CustomVideoSliderCard title="Thanks" icon="ShipWheel" handlePress={()=>ToastShow("Thanks for Click","success")}/>
          </ScrollView>

          <TouchableOpacity className='bg-secondary px-4 py-3 rounded-xl gap-2 mt-3 mb-5'>
            <Text className='font-rubik-semibold'>Comments</Text>
            <View className='flex-row gap-2 items-center'>
              <View className='w-6 h-6 rounded-full'
                      >
                         <Image
                      source={{uri:"https://api.dicebear.com/9.x/initials/png?seed=Shahbaz Khan"}}
                      className='w-6 h-6 rounded-full '
                      resizeMode='cover'
                      /> 
                </View>
            <Text className='text-gray-500 font-rubik text-sm' >{comment.slice(0,45)+"..."}</Text>
            </View>
          </TouchableOpacity>
          <Slider/>
      </View>
    }

    />
    </SafeAreaView>
  )
}

export default VideoDetails