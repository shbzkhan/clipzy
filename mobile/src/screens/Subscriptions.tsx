import {FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import HomeHeader from '../components/Header/HomeHeader'
import { goBack, navigate } from '../navigation/NavigationUtils'
import VideoCard from '../components/VideoCard'
import ChannelBox from '../components/ChannelBox'


const Video =[
  {
  _id:1,
  fullname:"Shahbaz Khan",
  avatar:"https://api.dicebear.com/9.x/initials/png?seed=Shahbaz Khan",
  title:"How to Make Think hair Look Thicker Naturally | Thin to Thick Hair Guide",
  thumbnail:"https://lickd.co/wp-content/uploads/2022/11/Canva-YouTube-Thumbnail-creator.jpeg",
  views:"5.3M",
  date:"2",
  time:"37.07"
},
  {
  _id:2,
  fullname:"Z Khan",
  avatar:"https://api.dicebear.com/9.x/initials/png?seed=Z Khan",
  title:"How to Make Think hair Look Thicker Naturally | Thin to Thick Hair Guide",
  thumbnail:"https://lickd.co/wp-content/uploads/2022/11/Canva-YouTube-Thumbnail-creator.jpeg",
  views:"5.2M",
  date:"7",
  time:"30.07"
},
  {
  _id:3,
  fullname:"z Khan",
  avatar:"https://api.dicebear.com/9.x/initials/png?seed=Z Khan",
  title:"How to Make Think hair Look Thicker Naturally | Thin to Thick Hair Guide",
  thumbnail:"https://lickd.co/wp-content/uploads/2022/11/Canva-YouTube-Thumbnail-creator.jpeg",
  views:"5.2M",
  date:"7",
  time:"30.07"
},
  {
  _id:4,
  fullname:"z Khan",
  avatar:"https://api.dicebear.com/9.x/initials/png?seed=Z Khan",
  title:"How to Make Think hair Look Thicker Naturally | Thin to Thick Hair Guide",
  thumbnail:"https://lickd.co/wp-content/uploads/2022/11/Canva-YouTube-Thumbnail-creator.jpeg",
  views:"5.2M",
  date:"7",
  time:"30.07"
},
  {
  _id:5,
  fullname:"z Khan",
  avatar:"https://api.dicebear.com/9.x/initials/png?seed=Z Khan",
  title:"How to Make Think hair Look Thicker Naturally | Thin to Thick Hair Guide",
  thumbnail:"https://lickd.co/wp-content/uploads/2022/11/Canva-YouTube-Thumbnail-creator.jpeg",
  views:"5.2M",
  date:"7",
  time:"30.07"
},
  {
  _id:6,
  fullname:"z Khan",
  avatar:"https://api.dicebear.com/9.x/initials/png?seed=Z Khan",
  title:"How to Make Think hair Look Thicker Naturally | Thin to Thick Hair Guide",
  thumbnail:"https://lickd.co/wp-content/uploads/2022/11/Canva-YouTube-Thumbnail-creator.jpeg",
  views:"5.2M",
  date:"7",
  time:"30.07"
},
  {
  _id:7,
  fullname:"z Khan",
  avatar:"https://api.dicebear.com/9.x/initials/png?seed=Z Khan",
  title:"How to Make Think hair Look Thicker Naturally | Thin to Thick Hair Guide",
  thumbnail:"https://lickd.co/wp-content/uploads/2022/11/Canva-YouTube-Thumbnail-creator.jpeg",
  views:"5.2M",
  date:"7",
  time:"30.07"
},
]

const Subscriptions = () => {
  const insets = useSafeAreaInsets();

  return (
     <SafeAreaView className='h-flex bg-white dark:bg-dark'>
      <HomeHeader/>
    <FlatList
    data={Video}
    keyExtractor={video =>video._id}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={[{ paddingBottom: insets.bottom + 56,}]}
    contentContainerClassName = "gap-6 pt-2"
    renderItem={({item})=>(
      <VideoCard {...item} />
    )}

    ListHeaderComponent={
        <View className='flex-row justify-center items-center'>
          <FlatList
          data={Video}
          keyExtractor={video =>video._id}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerClassName="flex gap-5 mt-2 px-4"
          renderItem={(item)=>(
            <ChannelBox item={item}/>
          )}
          />
          <TouchableOpacity className='px-3 '>
            <Text className='text-primary-600 font-bold text-md'>All</Text>
          </TouchableOpacity>
        </View>
    }

    />
    </SafeAreaView>
  )
}

export default Subscriptions