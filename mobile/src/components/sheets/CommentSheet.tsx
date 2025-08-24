import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import ActionSheet, { SheetManager, SheetProps } from 'react-native-actions-sheet'
import { StyleSheet } from 'react-native'
import CustomIcon from '../CustomIcon'
import Icon from '../../constants/Icons'
import { domyComment } from '../../utils/domyComment'
import { ToastShow } from '../../utils/Tost'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'

const CommentSheet = (props:SheetProps<"comment-sheet">) => {
  const [comment, setComment] = useState<string>("")
  return (
    <ActionSheet 
    id={props.sheetId}
    headerAlwaysVisible={true}
    isModal={true}
    onClose={()=>SheetManager.hide(props.sheetId)}
    gestureEnabled={true}
    keyboardHandlerEnabled={true}
    indicatorStyle={styles.indicator}
    enableGesturesInScrollView={true}
    containerStyle={styles.container}
    >
      
    <SafeAreaView className='bg-[#121212]'>
      
      <View className='h-full relative'>
      <View className='flex-row justify-between px-4 border-b border-gray-500 py-4'>
        <Text className='text-white font-rubik-bold text-xl'>Comment</Text>
        <TouchableOpacity
        onPress={()=>SheetManager.hide(props.sheetId)}
        >
          <Icon name="X" color='white'/>
        </TouchableOpacity>
      </View>
      <FlatList
       data={domyComment}
       keyExtractor={(item)=>item.id.toString()}
       contentContainerClassName='px-3 mt-5 gap-5 pb-24'
       className='flex-1'
       showsVerticalScrollIndicator={false}
       bounces={false}
       renderItem={({item})=>(
        <View className='flex-row gap-3'>
          <TouchableOpacity className=''>
            <Image
            source={{uri:item.avatar}}
            className='w-8 h-8 rounded-full'
            resizeMode='cover'
            
            />
          </TouchableOpacity>
          <View className='flex-1 gap-1'>
          <Text className='text-gray-300 text-xs font-rubik'>@{item.username} . {item.time} ago</Text>
          <Text className='text-white font-rubik'>{item.comment}</Text>
          <View className='flex-row gap-5'>
          <TouchableOpacity className='flex-row gap-1'>
            <Icon name='Heart' size={17}/>
            <Text className='text-white font-rubik text-sm'>34</Text>
          </TouchableOpacity>
         <TouchableOpacity className='flex-row gap-1 items-center'
         onPress={()=>ToastShow("Thanks for share comment", "success")}
         >
            <Icon name='Send' size={16}/>
            <Text className='text-white font-rubik text-sm'>Share</Text>
          </TouchableOpacity>
          </View>
          </View>
          <TouchableOpacity>
          <Icon name='EllipsisVertical' color='white' size={18}/>
          </TouchableOpacity>
        </View>
       )}
      />
     
      <View className={`bg-gray-900 border-t border-gray-500 w-full px-4 py-2 flex-row gap-2 items-center absolute bottom-0 ${comment && "pb-12"}`}>
        <TouchableOpacity className=''>
            <Image
            source={{uri:"https://api.dicebear.com/9.x/initials/png?seed=Shahbaz Khan"}}
            className='w-8 h-8 rounded-full'
            resizeMode='cover'
            
            />
          </TouchableOpacity>
        <TextInput
        className='bg-gray-600 px-4 rounded-lg flex-1 h-11 font-rubik text-white bp-2'
        value={comment}
        placeholder='Write Comment'
        onChangeText={(text)=>setComment(text)}

        />
        {
          (comment.trim() !=="") && <CustomIcon name="Send" className='bg-primary-600' color='white' handlePress={()=>ToastShow("Thanks for like", "success")}/>
        }
      </View>
      </View>
    </SafeAreaView>
    </ActionSheet>
  )
}

const styles = StyleSheet.create({
  indicator:{
    height:4,
    width:45,
    top:4,
    backgroundColor:"#52525B"
  },
  container:{
    backgroundColor:"#121212",
    height: "76%"
  },

})

export default CommentSheet