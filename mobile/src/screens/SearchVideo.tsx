import {FlatList, View, Text, Pressable } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { goBack, pop } from '../navigation/NavigationUtils'
import VideoCard from '../components/VideoCard'
import Slider from '../components/Header/Slider'
import SearchHeader from '../components/Header/SearchHeader'
import { useRoute } from '@react-navigation/native'
import { Video } from '../utils/domyData'



const SearchVideo = () => {
  // const navigation = useNavigation()
  const insets = useSafeAreaInsets();
  const data = useRoute()
  const searchD = data.params as string


  
  return (
     <SafeAreaView className='flex-1 bg-white'>
      <View className='gap-3 pb-2'>
        <Pressable className='px-4' onPress={()=>goBack()}>
       <SearchHeader
       value={searchD}
       editable={false}
       backPress={()=>pop(2)}
       />
       </Pressable>
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