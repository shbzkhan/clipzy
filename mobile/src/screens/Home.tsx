import { View, Text, Button, Image, FlatList } from 'react-native'
import React, { FC, useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import HomeHeader from '../components/Header/HomeHeader'
import { goBack, navigate } from '../navigation/NavigationUtils'
import VideoCard from '../components/VideoCard'
import VideoDetails from './Video'


const Video =[
  {
  _id:1,
  fullname:"Shahbaz Khan",
  avatar:"https://lickd.co/wp-content/uploads/2022/11/Canva-YouTube-Thumbnail-creator.jpeg",
  title:"How to Make Think hair Look Thicker Naturally | Thin to Thick Hair Guide",
  thumbnail:"https://lickd.co/wp-content/uploads/2022/11/Canva-YouTube-Thumbnail-creator.jpeg",
  views:"5.3M",
  date:"2",
  time:"37.07"
},
  {
  _id:2,
  fullname:"z Khan",
  avatar:"https://lickd.co/wp-content/uploads/2022/11/Canva-YouTube-Thumbnail-creator.jpeg",
  title:"How to Make Think hair Look Thicker Naturally | Thin to Thick Hair Guide",
  thumbnail:"https://lickd.co/wp-content/uploads/2022/11/Canva-YouTube-Thumbnail-creator.jpeg",
  views:"5.2M",
  date:"7",
  time:"30.07"
},
  {
  _id:3,
  fullname:"z Khan",
  avatar:"https://lickd.co/wp-content/uploads/2022/11/Canva-YouTube-Thumbnail-creator.jpeg",
  title:"How to Make Think hair Look Thicker Naturally | Thin to Thick Hair Guide",
  thumbnail:"https://lickd.co/wp-content/uploads/2022/11/Canva-YouTube-Thumbnail-creator.jpeg",
  views:"5.2M",
  date:"7",
  time:"30.07"
},
  {
  _id:4,
  fullname:"z Khan",
  avatar:"https://lickd.co/wp-content/uploads/2022/11/Canva-YouTube-Thumbnail-creator.jpeg",
  title:"How to Make Think hair Look Thicker Naturally | Thin to Thick Hair Guide",
  thumbnail:"https://lickd.co/wp-content/uploads/2022/11/Canva-YouTube-Thumbnail-creator.jpeg",
  views:"5.2M",
  date:"7",
  time:"30.07"
},
  {
  _id:5,
  fullname:"z Khan",
  avatar:"https://lickd.co/wp-content/uploads/2022/11/Canva-YouTube-Thumbnail-creator.jpeg",
  title:"How to Make Think hair Look Thicker Naturally | Thin to Thick Hair Guide",
  thumbnail:"https://lickd.co/wp-content/uploads/2022/11/Canva-YouTube-Thumbnail-creator.jpeg",
  views:"5.2M",
  date:"7",
  time:"30.07"
},
  {
  _id:6,
  fullname:"z Khan",
  avatar:"https://lickd.co/wp-content/uploads/2022/11/Canva-YouTube-Thumbnail-creator.jpeg",
  title:"How to Make Think hair Look Thicker Naturally | Thin to Thick Hair Guide",
  thumbnail:"https://lickd.co/wp-content/uploads/2022/11/Canva-YouTube-Thumbnail-creator.jpeg",
  views:"5.2M",
  date:"7",
  time:"30.07"
},
  {
  _id:7,
  fullname:"z Khan",
  avatar:"https://lickd.co/wp-content/uploads/2022/11/Canva-YouTube-Thumbnail-creator.jpeg",
  title:"How to Make Think hair Look Thicker Naturally | Thin to Thick Hair Guide",
  thumbnail:"https://lickd.co/wp-content/uploads/2022/11/Canva-YouTube-Thumbnail-creator.jpeg",
  views:"5.2M",
  date:"7",
  time:"30.07"
},
]

const Home = () => {
  // const navigation = useNavigation()
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState(true)

  
  return (
     <SafeAreaView className='h-flex bg-red'>
      <HomeHeader/>
    <FlatList
    data={Video}
    keyExtractor={video =>video._id}
    contentContainerStyle={[{ paddingBottom: insets.bottom + 56,}]}
    contentContainerClassName = "gap-6 pt-2"
    renderItem={({item})=>(
      <VideoCard {...item} />
    )}


    />
    </SafeAreaView>
  )
}

export default Home