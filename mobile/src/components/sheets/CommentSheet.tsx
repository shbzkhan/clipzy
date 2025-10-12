import React, { useState } from 'react'
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ActionSheet, { SheetManager, SheetProps, FlatList } from 'react-native-actions-sheet'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from '../../constants/Icons'
import { timeAgo } from '../../constants/TimeAgo'
import { usePaginatedComments } from '../../hooks/usePaginatedComment'
import { ToastShow } from '../../utils/Tost'
import CommentBox from '../comment/CommentBox'
import GlobalLoader from '../GlobalLoader'
import UserLogo from '../UserLogo'
import EmptyState from '../EmptyState'
import { useDeleteCommentMutation } from '../../redux/api/commentApi'
import CommentCardLoader from '../comment/CommentCardLoader'
import CommentCard from '../comment/CommentCard'

const CommentSheet = (props:SheetProps<"comment-sheet">) => {
  const videoId = props.payload?.entityId;
  const {comments, isLoading, isFetching, page} = usePaginatedComments({videoId})
  const [edit, setEdit] = useState(false)
  const [update, setUpdate] = useState(false)
  const [editData, setEditData] =useState({
    id:"",
    content:""
  })

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
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        className='max-h-full'
      >
      <SafeAreaView className='max-h-full'>
      <View className='flex-row justify-center px-4 py-4 border-b border-gray-500'>
        <Text className='text-lg text-white center text- font-rubik-bold'>Comment</Text>
      </View>
      <FlatList
       data={!isLoading?comments:[1,2,3,4,5,6,7]}
       keyExtractor={(item)=>item._id}
       contentContainerClassName='px-3 mt-5 gap-5 pb-24'
       showsVerticalScrollIndicator={false}
       bounces={false}
       className='h-full'
       keyboardShouldPersistTaps="handled"
       keyboardDismissMode='on-drag'
       renderItem={({item})=>(
        !isLoading?(
          <CommentCard 
          item={item}
          edit={edit}
          setEdit={setEdit}
          update={update}
          setUpdate={setUpdate}
          editData={editData}
          setEditData={setEditData}
          />
        // <>
        // <Pressable className='flex-row gap-3'
        // onPress={()=>{
        //   setUpdate(false)
        //   setEdit(false)
        //   setEditData({
        //     id:"",
        //     content:""
        //   })
        // }}
        // >
        //   <UserLogo
        //         uri={item.owner.avatar}
        //         heightAndWidth={8}
        //       />
        //   <View className='flex-1 gap-1'>
        //   <Text className='text-xs text-gray-300 font-rubik'>@{item.owner.username} • {timeAgo(item.createdAt)}</Text>
        //   <Text className='text-white font-rubik'>{item.content}</Text>
        //   <View className='flex-row gap-5'>
        //   <TouchableOpacity className='flex-row gap-1'>
        //     <Icon name='Heart' size={17}/>
        //     <Text className='text-sm text-white font-rubik'>{item.likes}</Text>
        //   </TouchableOpacity>
        //  <TouchableOpacity className='flex-row items-center gap-1'
        //  onPress={()=>ToastShow("Thanks for share comment", "success")}
        //  >
        //     <Icon name='Send' size={16}/>
        //     <Text className='text-sm text-white font-rubik'>Share</Text>
        //   </TouchableOpacity>
        //   </View>
        //   </View>
        //   <TouchableOpacity
        //   disabled={deletingComment}
        //   onPress={()=>{
        //     setEdit(true)
        //     setEditData({
        //       id:item._id,
        //       content:item.content
        //     })
        //   }}
        //   >
        //   <Icon name={!deletingComment?('EllipsisVertical'):(editData.id===item._id?"Loader":'EllipsisVertical')} color='white' size={18}/>
        //   </TouchableOpacity>
        // </Pressable>
        //   {
        //     (edit && item._id === editData.id) &&(
        //   <View className='absolute justify-center gap-4 px-3 py-3 rounded-md right-5 top-2 bg-dark-100'>
        //     <TouchableOpacity className='flex-row items-center gap-1'
        //     onPress={()=>setUpdate(!update)}
        //     >
        //       <Icon name='Pencil' size={15}/>
        //       <Text className='text-white font-rubik-bold'>Edit</Text>
        //   </TouchableOpacity>
        //     <TouchableOpacity className='flex-row items-center gap-1'
        //     onPress={()=>handleDeleteComment(item._id)}
        //     >
        //       <Icon name='Trash2' size={15}/>
        //       <Text className='text-sm text-danger font-rubik-bold'>Delete</Text>
        //   </TouchableOpacity>
        //   </View>
        //     )
        //   }
        // </>
        )
        :
        <CommentCardLoader/>
       )}
       ListFooterComponent={
               isFetching && page > 1 ? (
                 <ActivityIndicator  size="small" color="#2563EB" />
               ) : null
             }
       ListEmptyComponent={
        <EmptyState
        title='No comments yet'
        description='Start the conversation'
        />
       }
      />
      <CommentBox 
      videoId={videoId} 
      update ={update} 
      updateData={editData}
      setUpdate={setUpdate}
      setEdit={setEdit}
      />
      
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