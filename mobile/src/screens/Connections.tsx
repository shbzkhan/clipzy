import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../components/CustomButton'
import CustomHeader from '../components/Header/CustomHeader'
import ChannelBox from '../components/ChannelBox'
import { useFollowersConnetionsQuery } from '../redux/api/connectionApi'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import GlobalLoader from '../components/GlobalLoader'

const Connections = () => {
    const {user} = useSelector((state:RootState)=>state.user)
    const {data, isLoading} = useFollowersConnetionsQuery(user?._id)
    if(isLoading){
        return <GlobalLoader/>
    }
  return (
    <SafeAreaView className='flex-1 px-3 bg-white dark:bg-dark'>
        <CustomHeader title='Connections'/>
         <FlatList
         data={data}
         keyExtractor={item=>item._id}
         contentContainerClassName='gap-6'
         showsVerticalScrollIndicator={false}
         renderItem={({item})=><ChannelBox  item={item}/>}
         />
         {/* <ChannelBox/> */}
    </SafeAreaView>
  )
}

export default Connections