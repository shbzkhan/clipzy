import { View, Text, Image, TouchableOpacity, Platform } from 'react-native'
import React, { FC } from 'react'
import { videoProp } from '../../screens/Post'
import { format } from '../../constants/TimeFormat'
import { createThumbnail } from 'react-native-create-thumbnail'
import { navigate } from '../../navigation/NavigationUtils'
import { CameraRoll } from '@react-native-camera-roll/camera-roll'


const PostCard = ({item}:videoProp) => {

    const handleVideoSelect = async(data:any)=>{
        const {uri}=data;
        if(Platform.OS === "android"){
            createThumbnail({
                url:uri || "",
                timeStamp:100,
            }).then(response=>{
                console.log(response)
                navigate("UploadVideo",{
                    thumb_uri:response.path,
                    file_uri:uri
                })
            }).catch(err =>{
                console.log("Thumbnail Generation error", err)
            })
            return
        }

        const fileData = await CameraRoll.iosGetImageDataById(uri)
         createThumbnail({
                url:fileData?.node?.image?.filepath || "",
                timeStamp:100,
            }).then(response=>{
                console.log(response)
                navigate("UploadVideo",{
                    thumb_uri:response.path,
                    file_uri:uri
                })
            }).catch(err =>{
                console.log("Thumbnail Generation error", err)
            })
    }
  return (
    <TouchableOpacity className='w-[33%] h-[200px] rounded-md overflow-hidden'
    onPress={()=>handleVideoSelect(item)}
    >
      <Image
      className='w-full h-full'
      resizeMode='cover'
      source={{uri:item.uri}}
      />
      
      <Text className='absolute text-gray-200 bottom-1 right-3 font-rubik-medium'>{format(item.playableDuration)}</Text>
      </TouchableOpacity>
    //   <Text>{playbleDuration}</Text>
    // </View>
  )
}

export default PostCard