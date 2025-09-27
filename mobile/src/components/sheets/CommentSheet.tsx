import { View, Text, TouchableOpacity, Image, Keyboard, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useRef, useState } from 'react'
import ActionSheet, { SheetManager, SheetProps} from 'react-native-actions-sheet'
import { StyleSheet } from 'react-native'
import CustomIcon from '../CustomIcon'
import Icon from '../../constants/Icons'
import { domyComment } from '../../utils/domyComment'
import { ToastShow } from '../../utils/Tost'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import UserLogo from '../UserLogo'
import CommentBox from '../CommentBox'
import { colorScheme, useColorScheme } from 'nativewind'

const CommentSheet = (props:SheetProps<"comment-sheet">) => {
const {colorScheme} = useColorScheme();
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
    animated
    containerStyle={styles.container}
    drawUnderStatusBar={false}
    onSnapIndexChange={()=>Keyboard.dismiss()}
    >

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "position"}
        className='max-h-full'
      >
      <SafeAreaView className='max-h-full'>
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
       showsVerticalScrollIndicator={false}
      //  bounces={false}
      //  keyboardShouldPersistTaps="handled"
      //  keyboardDismissMode='on-drag'
       renderItem={({item})=>(
        <View className='flex-row gap-3'>
          <UserLogo
                uri={item.avatar}
                heightAndWidth={8}
              />
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
      <CommentBox/>
      </SafeAreaView>
      </KeyboardAvoidingView>
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
    backgroundColor:"#0c263b",
    height: "76%"
  },

})

export default CommentSheet