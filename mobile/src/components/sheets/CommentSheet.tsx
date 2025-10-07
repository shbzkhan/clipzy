import React from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ActionSheet, { SheetManager, SheetProps } from 'react-native-actions-sheet'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from '../../constants/Icons'
import { timeAgo } from '../../constants/TimeAgo'
import { usePaginatedComments } from '../../hooks/usePaginatedComment'
import { ToastShow } from '../../utils/Tost'
import CommentBox from '../CommentBox'
import GlobalLoader from '../GlobalLoader'
import UserLogo from '../UserLogo'

const CommentSheet = (props:SheetProps<"comment-sheet">) => {
  const videoId = props.payload?.entityId;
  const {comments, isLoading} = usePaginatedComments({videoId})

  if(isLoading){
    return <GlobalLoader/>
  }
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
      <View className='flex-row justify-between px-4 py-4 border-b border-gray-500'>
        <Text className='text-xl text-white font-rubik-bold'>Comment</Text>
        <TouchableOpacity
        onPress={()=>SheetManager.hide(props.sheetId)}
        >
          <Icon name="X" color='white'/>
        </TouchableOpacity>
      </View>
      {/* <View className='h-full'> */}
      <FlatList
       data={comments}
       keyExtractor={(item)=>item._id}
       contentContainerClassName='px-3 mt-5 gap-5 pb-24 h-full'
       showsVerticalScrollIndicator={false}
      //  bounces={false}
      //  keyboardShouldPersistTaps="handled"
      //  keyboardDismissMode='on-drag'
       renderItem={({item})=>(
        <View className='flex-row gap-3'>
          <UserLogo
                uri={item.owner.avatar}
                heightAndWidth={8}
              />
          <View className='flex-1 gap-1'>
          <Text className='text-xs text-gray-300 font-rubik'>@{item.owner.username} . {timeAgo(item.createdAt)} ago</Text>
          <Text className='text-white font-rubik'>{item.content}</Text>
          <View className='flex-row gap-5'>
          <TouchableOpacity className='flex-row gap-1'>
            <Icon name='Heart' size={17}/>
            <Text className='text-sm text-white font-rubik'>{item.likes}</Text>
          </TouchableOpacity>
         <TouchableOpacity className='flex-row items-center gap-1'
         onPress={()=>ToastShow("Thanks for share comment", "success")}
         >
            <Icon name='Send' size={16}/>
            <Text className='text-sm text-white font-rubik'>Share</Text>
          </TouchableOpacity>
          </View>
          </View>
          <TouchableOpacity>
          <Icon name='EllipsisVertical' color='white' size={18}/>
          </TouchableOpacity>
        </View>
       )}
      />
      {/* </View> */}
      <CommentBox videoId={videoId}/>
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