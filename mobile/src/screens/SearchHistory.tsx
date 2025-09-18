import {FlatList, ScrollView, Text, TouchableOpacity, View,} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchHeader from '../components/Header/SearchHeader'
import CustomIcon from '../components/CustomIcon'
import Icon from '../constants/Icons'
import { goBack, navigate } from '../navigation/NavigationUtils'
import SearchInput from '../components/SearchInput'
import AsyncStorage from '@react-native-async-storage/async-storage'
interface SearchDataProps {
  id?:string
  text?:string
}
const Search = () => {
  const [search, setSearch] = useState<any>("");
  const [searchData, setSearchData] = useState<SearchDataProps[]>([])

 const searchHistory = async () => {
  try {
    const data = await AsyncStorage.getItem("search-history");
    if (data) {
      const parsedData = JSON.parse(data);
      setSearchData(parsedData);
    }
  } catch (error) {
    console.error("Error loading search history:", error);
  }
};

const filterdata = ()=>{

}
  useEffect(()=>{
    searchHistory()
  },[search])

  const addSearch = async () => {
  if (search.trim() === "") return;
  navigate("SearchVideo", search);
  const newSearchData = [
    ...searchData,
    { id: Date.now().toString(), text: search },
  ];
  setSearchData(newSearchData);
  await AsyncStorage.setItem("search-history", JSON.stringify(newSearchData));

};
  const removeSearch = async (id: string) => {
  const newSearchData = searchData.filter(item => item.id !== id);
  setSearchData(newSearchData);
  await AsyncStorage.setItem("search-history", JSON.stringify(newSearchData));
};
  return (
    <SafeAreaView className='flex-1 bg-white px-4 dark:bg-dark'>
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
         <TouchableOpacity className='pl-3 flex-row justify-between items-center'
         key={item.id}
         onPress={()=>{
           navigate("SearchVideo", item.text)
           setSearch(item.text)
         }}
         >
              <View className='flex-row gap-6'>
              <Icon name="History" size={26}/>
              <Text className='font-rubik-medium text-xl dark:text-white'>{item.text}</Text>
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