import { View, TextInput, KeyboardAvoidingView, Pressable, TouchableOpacity, Animated} from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { BlurView } from "@react-native-community/blur";
import CustomButton from '../CustomButton';
import {useColorScheme} from "nativewind"
import { useCreatePlaylistMutation, useDeletePlaylistMutation, useUpdatePlaylistMutation } from '../../redux/api/playlistApi';
import { ToastShow } from '../../utils/Tost';
import { Text } from 'react-native';
import { ActivityIndicator } from 'react-native';

 export interface formDataProps {
  name:string
  description:string
}

 interface playlsitUploaderProps{
  isCreatePlaylist:boolean
  setIsCreatePlaylist:any
  isUpdatePlaylist:boolean
  setIsUpdatePlaylist:any
  videoData:{
    id:string | null
    name:string
    description:string
  }
  setVideoData:any
 }

const PlaylistUploader:FC<playlsitUploaderProps> = ({isCreatePlaylist, setIsCreatePlaylist, isUpdatePlaylist, setIsUpdatePlaylist, videoData, setVideoData}) => {
  const {colorScheme} = useColorScheme();
  const [form, setForm] = useState<formDataProps>({
    name : videoData.name || "",
    description:videoData.description || ""
  })
  const [error, setError] = useState<string>("")
  

  const[createPlaylist, {isLoading}]=useCreatePlaylistMutation()
  const[updatePlaylist, {isLoading:updateLoading}]=useUpdatePlaylistMutation()
  const[deletePlaylist, {isLoading:deleteLoading}]=useDeletePlaylistMutation()


  //animated
  const slideAnim = useRef(new Animated.Value(1000)).current;
  useEffect(() => {
    if (isCreatePlaylist) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 1000,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isCreatePlaylist]);

  const handleCreatePlaylist = async()=>{
    setError("")
    try {
      const uploadData = await createPlaylist(form).unwrap()
      handleCreatePlaylistDisable()
      console.log("video upload ",uploadData.data)
      ToastShow(uploadData.message)
    } catch (err) {
      ToastShow(err?.data?.message,"danger")
      setError(err?.data?.message)
    }
  }

  const handleUpdatePlaylist = async (playlistId:string | null)=>{
    setError("")
    try {
      console.log("uploading start")
      const updatedData = await updatePlaylist({id:playlistId, formData:form}).unwrap()
      handleCreatePlaylistDisable()
      console.log("video upload ",updatedData.data)
      ToastShow(updatedData.message)
    } catch (err) {
      ToastShow(err?.data?.message,"danger")
      setError(err?.data?.message)
      console.log("failed", errr)
    }
  }
  const handleDeletePlaylist = async (playlistId:string | null)=>{
    setError("")
    try {
      console.log("uploading start")
      const deletedData = await deletePlaylist(playlistId).unwrap()
      handleCreatePlaylistDisable()
      console.log("video upload ",deletedData.data)
      ToastShow(deletedData.message)
    } catch (err) {
      ToastShow(err?.data?.message,"danger")
      setError(err?.data?.message)
      console.log("failed", errr)
    }
  }
  

const handleCreatePlaylistDisable = ()=>{
       setIsCreatePlaylist(false)
       setIsUpdatePlaylist(false)
       setVideoData({
         id:null,
         name:"",
         description:""
      })
}


  return (
    <Pressable className='absolute top-0 bottom-0 left-0 z-50 justify-center w-full righ-0 '
    onPress={handleCreatePlaylistDisable}
    disabled ={isLoading || updateLoading || deleteLoading}
    >
      <BlurView
        style={{ position: "absolute",top: 0,left: 0,bottom: 0,right: 0}}
        blurType={colorScheme === "dark"?"light":"dark"}
        blurAmount={10}
        reducedTransparencyFallbackColor="black"
      />
      <KeyboardAvoidingView behavior='padding'>
      <Animated.View
            style={{
              transform: [{ translateY: slideAnim }],
            }}
        >
        <View className='gap-5 p-4 m-5 bg-white dark:bg-dark rounded-xl'>
        <TextInput
        placeholder='Write you playlist title'
        value={form.name}
        className='w-full px-4 border-2 border-primary-300 focus:border-primary-600 rounded-xl font-rubik-bold dark:text-white'
        onChangeText={(e)=>setForm({...form, name:e})}
        />
        <TextInput
        placeholder='Write description'
        value={form.description}
        className='w-full h-32 px-4 align-top border-2 border-primary-300 focus:border-primary-600 rounded-xl font-rubik-medium text-start dark:text-white'
        onChangeText={(e)=>setForm({...form, description:e})}
        multiline
        />
        {
          isUpdatePlaylist ?
          (
            <>
            <CustomButton 
              title='Update Playlist'
              isLoading={updateLoading}
              handlePress={ ()=>handleUpdatePlaylist(videoData.id)}
            />
            <TouchableOpacity
            className='flex-row justify-center gap-2'
            onPress={()=>handleDeletePlaylist(videoData.id)}
            >
            {updateLoading && <ActivityIndicator color="#F75555" size="small"/>}
            <Text className="text-center font-rubik-semibold text-danger ">{!updateLoading? "Delete Playlist": "Deleteing"}</Text>
            </TouchableOpacity>
            </>
          ):(
            <CustomButton 
              title='Create Playlist'
              isLoading={isLoading}
              handlePress={ handleCreatePlaylist}
            />
          )
        }
      {error && <Text className="text-center font-rubik text-danger">{error}</Text>}
        </View>
      </Animated.View>
      </KeyboardAvoidingView>
    </Pressable>
  )
}

export default PlaylistUploader