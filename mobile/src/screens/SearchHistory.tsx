import {FlatList, ScrollView, Text, TouchableOpacity, View,} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchHeader from '../components/Header/SearchHeader'
import CustomIcon from '../components/CustomIcon'
import Icon from '../constants/Icons'
import { goBack, navigate } from '../navigation/NavigationUtils'
import SearchInput from '../components/SearchInput'
interface SearchDataProps {
  id?:string
  text?:string
}
const Search = () => {
  const [search, setSearch] = useState<any>("");

  const [searchData, setSearchData] = useState<SearchDataProps[]>([])

  const addSearch = ()=>{

    if(search.trim() === "") return
    navigate("SearchVideo", search)
    setSearchData([...searchData,{id:Date.now().toString(), text:search}])
    setSearch(setSearch)
  }

  const removeSearch = (id:string)=>{
    setSearchData(searchData.filter(text =>text.id !== id))
  }
  return (
    <SafeAreaView className='flex-1 bg-white px-4'>
      <SearchHeader
      value={search}
      backPress={()=>goBack()}
      PressX={()=>setSearch("")}
      onChangeText={(t)=>setSearch(t)}
      onSubmitEditing={addSearch}
      autoFocus={true}
      />
      <FlatList
      data={searchData.reverse()}
      keyExtractor={(item)=>item.id}
      contentContainerClassName='gap-3 mt-4'
      renderItem={({item})=>(
         <TouchableOpacity className='px-4 flex-row justify-between items-center'>
              <View className='flex-row gap-6'>
              <Icon name="History" size={26}/>
              <Text className='font-rubik-medium text-xl'>{item.text}</Text>
              </View>
              <TouchableOpacity
              onPress={()=>removeSearch(item.id)}
              >
              <Icon name="X" size={26} />
              </TouchableOpacity>

            </TouchableOpacity>
      )}
      />
    </SafeAreaView>
  )
}

export default Search