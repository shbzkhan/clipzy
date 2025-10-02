import { View, TextInput, KeyboardAvoidingView, Pressable} from 'react-native'
import React, { useState } from 'react'
import { BlurView } from "@react-native-community/blur";
import CustomButton from '../CustomButton';
import {useColorScheme} from "nativewind"
import { useCreatePlaylistMutation } from '../../redux/api/playlistApi';
import { ToastShow } from '../../utils/Tost';
import { Text } from 'react-native';

 export interface formDataProps {
  name:string
  description:string
}

const PlaylistUploader = ({setIsCreatePlaylist}:boolean) => {
  const {colorScheme} = useColorScheme();
  const [form, setForm] = useState<formDataProps>({
    name : "",
    description:""
  })
  const [error, setError] = useState<string>("")

  const[createPlaylist, {isLoading}]=useCreatePlaylistMutation()

  const handleCreatePlaylist = async()=>{
    setError("")
    try {
      const uploadData = await createPlaylist(form).unwrap()
      setIsCreatePlaylist(false)
      console.log("video upload ",uploadData.data)
      ToastShow(uploadData.message)
    } catch (error) {
      ToastShow(error?.data?.message,"danger")
      setError(error?.data?.message)
    }
  }



  return (
    <Pressable className='absolute top-0 righ-0 left-0 bottom-0 w-full justify-center z-50 '
    onPress={()=>setIsCreatePlaylist(false)}
    >
      <BlurView
        style={{ position: "absolute",top: 0,left: 0,bottom: 0,right: 0}}
        blurType={colorScheme === "dark"?"light":"dark"}
        blurAmount={10}
        reducedTransparencyFallbackColor="black"
      />
      <KeyboardAvoidingView behavior='padding'>
      <View className='bg-white dark:bg-dark p-4 m-5 rounded-xl gap-5'>
        <TextInput
        placeholder='Write you playlist title'
        value={form.name}
        className='border-2 px-4 w-full border-primary-300 focus:border-primary-600 rounded-xl font-rubik-bold'
        onChangeText={(e)=>setForm({...form, name:e})}
        />
        <TextInput
        placeholder='Write description'
        value={form.description}
        className='border-2 px-4 w-full border-primary-300 focus:border-primary-600 rounded-xl font-rubik-medium h-32 text-start align-top'
        onChangeText={(e)=>setForm({...form, description:e})}
        multiline
        />
      <CustomButton 
      title='Create Playlist'
      isLoading={isLoading}
      handlePress={handleCreatePlaylist}
      />
      {error && <Text className="font-rubik text-danger text-center">{error}</Text>}
      </View>
      </KeyboardAvoidingView>
    </Pressable>
  )
}

export default PlaylistUploader