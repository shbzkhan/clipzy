import {FlatList, View, Text } from 'react-native'
import React, { FC, useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { goBack, navigate } from '../navigation/NavigationUtils'
import VideoCard from '../components/VideoCard'
import Slider from '../components/Header/Slider'
import SearchHeader from '../components/Header/SearchHeader'
import { useRoute } from '@react-navigation/native'


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

const SearchVideo = () => {
  // const navigation = useNavigation()
  const insets = useSafeAreaInsets();
  const data = useRoute()
  const searchD = data.params

  const [search, setSearchD] = useState<any>("");

  
  return (
     <SafeAreaView className='flex-1 bg-white'>
      <View className='gap-3'>
      <SearchHeader
      handleChange={(text)=>setSearchD(text)}
      handlePress={()=>navigate("SearchVideo", search)}
      />
      <Slider/>
      </View>
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
      <View className='px-4'>
        <Text className='text-primary-600 text-rubik'>Search Result: <Text className='text-black/70 text-rubik'>{searchD}</Text></Text>
      </View>
    }

    />
    </SafeAreaView>
  )
}

export default SearchVideo