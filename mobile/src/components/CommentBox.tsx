import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import UserLogo from './UserLogo'
import CustomIcon from './CustomIcon'
import { EmojiData } from '../utils/emojiData'
import { ToastShow } from '../utils/Tost'
import { useAddCommentMutation } from '../redux/api/commentApi'

const CommentBox = ({videoId}:{videoId:string}) => {
    const [comment, setComment] = useState<string>("")
  const [isFocused, setIsFocused] = useState(false);

  const handleEmojiClick =(emoji:string)=>{
    setComment((prevComment)=>prevComment + emoji)
  }


  const [addComment, {isLoading}] = useAddCommentMutation()
  
    const handleComment = async()=>{
      try {
        const commented = await addComment({videoId, content:comment}).unwrap()
        console.log("commented", commented)
        ToastShow(commented.message)
        setComment("")
      } catch (error) {
        console.log("Error ",error)
        ToastShow(error.data.message)
      }
    }
  return (
    <View className={`bg-dark border-t border-gray-500 w-full px-4 py-2 gap-2 ${isFocused && "pb-14"}`}>
        <View className='flex-row gap-2 '>
        <UserLogo
                uri={"https://api.dicebear.com/9.x/initials/png?seed=Z Khan"}
                heightAndWidth={9}
              />
        <TextInput
        className='flex-1 px-4 text-white rounded-lg bg-dark-100 font-rubik min-h-11'
        value={comment}
        multiline
        placeholder='Write Comment'   
        placeholderTextColor="#9E9E9E"
        textAlignVertical='center'
        onChangeText={(text)=>setComment(text)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}

        />
        {
          (comment.trim() !=="") && <CustomIcon name="Send" className='bg-primary-600' color='white' handlePress={handleComment}/>
        }
        </View>
        { isFocused &&
        <View className='flex-row justify-between px-4'>
            {
                EmojiData?.map((i:string, index:number)=>(
                    <TouchableOpacity
                    key={index}
                    onPress={()=>handleEmojiClick(i)}
                    >
                        <Text className='text-2xl'>{i}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
        }
      </View>
  )
}

export default CommentBox