import {Text,} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchHeader from '../components/Header/SearchHeader'

const Search = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <SearchHeader
      setSearch={setSearch}
      search={search}
      />
      <Text>{search}</Text>
      
    </SafeAreaView>
  )
}

export default Search