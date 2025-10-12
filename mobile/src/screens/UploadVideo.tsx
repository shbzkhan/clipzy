import { ActivityIndicator, ScrollView, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomHeader from '../components/Header/CustomHeader'
import { Image } from 'react-native'
import { useRoute } from '@react-navigation/native'
import CustomButton from '../components/CustomButton'
import ImageIcon from '../constants/ImageIcon'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useVideoUploadMutation } from '../redux/api/videoApi'
import { ToastLoading, ToastShow } from '../utils/Tost'
import { navigate, pop } from '../navigation/NavigationUtils'
import { useDispatch } from 'react-redux'


interface uriData{
  thumb_uri:string;
  file_uri:string;
}

const UploadVideo = () => {
  const dispatch = useDispatch()
  const data = useRoute()
  const item = data?.params as uriData
  const [videoUpload,{isLoading}]= useVideoUploadMutation()

  const [caption, setCaption] = useState<string>("")


  const handleVideoUpload = async()=>{
    if(caption.trim()===""){
      return ToastShow("Title is required","danger")
    }

    const formData = new FormData();
       formData.append("videoFile", {
         uri: item.file_uri,
         name: `video_${Date.now()}.mp4`,   
         type: "video/mp4",               
       });

       formData.append("thumbnail", {
         uri: item.thumb_uri,
         name: `thumbnail_${Date.now()}.jpg`,
         type: "image/jpeg",
       });
       formData.append("title", caption)
    try {
          pop(2)
          const uploaded = await videoUpload(formData).unwrap()
          ToastShow(uploaded.message)
    } catch (error) {
      ToastShow(error?.data?.message,"danger")
      console.log("error", error);
    }

  }
  
  
  
  return (
    <SafeAreaView className='flex-1 px-4 bg-white dark:bg-dark'>
      <KeyboardAwareScrollView>
      <CustomHeader title='Video Details'/>
      <ScrollView className='gap-3 py-5 mt-7'>
        <View className='flex-row items-center gap-3'>
          <Image
          source={{uri: item.thumb_uri}}
          resizeMode='cover'
          className='w-[25%] h-[150px] rounded-md'
          />
          <TextInput
          value={caption}
          multiline
          onChangeText={(text)=>setCaption(text)}
          className='bg-secondary dark:bg-dark flex-1 px-2 w-full h-[150px] text-start align-top border-2 border-primary-200 rounded-md font-rubik-medium dark:text-white dark:border-dark-100'
          placeholder='Write title here'
          />
        </View>
        <View className='mt-8'>
        <CustomButton 
        isLoading={isLoading}
        handlePress={handleVideoUpload}
        icon={ImageIcon.upload} 
        tintColor='white' title='Publish Video' 
        />
        </View>
      </ScrollView>
        </KeyboardAwareScrollView>
        {/* {isLoading&&(<View className='absolute top-0 bottom-0 left-0 right-0 items-center justify-center bg-black/80'>
          <ActivityIndicator color="#2563EB" size="large"/>
        </View>)} */}
        
    </SafeAreaView>
  )
}

export default UploadVideo