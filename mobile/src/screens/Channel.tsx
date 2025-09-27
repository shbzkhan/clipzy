import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomIcon from '../components/CustomIcon'
import { ActivityIndicator } from 'react-native-paper'
import Icon from '../constants/Icons'
import { launchImageLibrary } from 'react-native-image-picker'
import { ToastShow } from '../utils/Tost'
import { userData } from '../redux/slice/userSlice'
import { useAvatarMutation, useCoverImageMutation } from '../redux/api/authApi'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { MaterialTabBar, Tabs, CollapsibleTabView, ScrollView } from 'react-native-collapsible-tab-view'
import UserLogo from '../components/UserLogo'
import SubscribedButton from '../components/SubscribedButton'
import wt from "react-native-wind"
import PlaylistCard from '../components/PlaylistCard'
import CustomHeader from '../components/Header/CustomHeader'
import AuthBox from '../components/AuthBox'
// import UserLogo from '../components/UserLogo'
// import SubscribedButton from '../components/SubscribedButton'
// import Playlist from './Playlist'
// import Profile from './Profile'
// import Home from './Home'
// import WatchHistory from './WatchHistory'
// import Post from './Post'

const HEADER_HEIGHT = 250

const Header =()=>{
  const user = useSelector((state:RootState)=>state.user.user)
    const dispatch = useDispatch()
  
    console.log(user)
    const [username, setUsername] = useState<string | undefined>(user?.username)
    const [fullname, setFullname] = useState<string | undefined>(user?.fullname)
    const [avatarImage, setAvatarImaage] = useState<string>(user?.avatar)
    const [coverImg, setCoverImg] = useState<string | null>(user?.coverImage)
    const [editable, setEditable] = useState<boolean>(false)
    const [editAvatar, setEditAvatar] = useState<boolean>(false)
    const[avatar,{isLoading}] = useAvatarMutation()
    const[coverImage,{isLoading:coverLoading}] = useCoverImageMutation()

    
   
  
  
    const handleAvatarPicker = async()=>{
    setEditAvatar(false)
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxHeight: 2000,
      maxWidth: 2000,
      includeBase64: false,
    };
  
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImageUri = response.assets[0].uri;
        setAvatarImaage(selectedImageUri)
        setEditAvatar(true)
      }
    });
    }
    
    const handleAvatarChange = async()=>{
      const formData = new FormData();
          formData.append("avatar", {
           uri: avatarImage,
           name: `avatar_${Date.now()}.jpg`,
           type: "image/jpeg",
         });
      try {
         const updateAvatar = await avatar(formData).unwrap()
         dispatch(userData({...user,avatar:avatarImage}))
          ToastShow(updateAvatar.message)
      } catch (error) {
        setAvatarImaage(user?.avatar)
        console.log(error)
        ToastShow("Avatar Updation Failed","danger")
      }
    }
  
    const handleCoverPicker = async()=>{
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxHeight: 198,
      maxWidth: 2000,
      includeBase64: false,
    };
  
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImageUri = response.assets[0].uri;
        setCoverImg(selectedImageUri)
        handleCoverChange(selectedImageUri)
      }
    });
    }
  
    const handleCoverChange = async(imageUri:string)=>{
      const formData = new FormData();
          formData.append("coverImage", {
           uri: imageUri,
           name: `coverImage_${Date.now()}.jpg`,
           type: "image/jpeg",
         });
      try {
         const updateCover = await coverImage(formData).unwrap()
         console.log("coverUpdate",updateCover)
         dispatch(userData({...user,coverImage:imageUri}))
          ToastShow(updateCover.message)
      } catch (error) {
        setCoverImg(user?.coverImage || null)
        console.log(error)
        ToastShow("Cover Image Updation Failed","danger")
      }
    }
    if(!user) return <AuthBox name="Video Creation"/>
      return (
        <>
        <View className='h-28 w-full'>
                  {/* <View className='w-52'></View> */}
                {coverImg ?(
                  <TouchableOpacity onPress={handleCoverPicker}
                  disabled={coverLoading}
                  >
                  <Image
                  source={{uri:coverImg}}
                  className='w-full h-full'
                  resizeMode='cover'
                  />
                  {coverLoading && (
                  <View className='absolute h-full w-full bg-black/50 justify-center items-center'>
                    <ActivityIndicator color="#2563EB" size="large"/>
                  </View>
                  )}
                  </TouchableOpacity>
                ):(
                <TouchableOpacity className='h-full w-full bg-secondary dark:bg-black/30'
                onPress={handleCoverPicker}
                >
                <View className='justify-center items-center h-full'>
                <Icon name='Camera' size={38}/>
                </View>
                </TouchableOpacity>
                )}
                
      </View>
      <View className='px-4 gap-2 mt-5'>
          <View className='flex-row items-center gap-5'>
                <TouchableOpacity className=' w-24'
                disabled={isLoading}
                onPress={handleAvatarPicker}
                >
                  <UserLogo
                  heightAndWidth={24}
                  uri={avatarImage}
                  />
                  
                  {isLoading &&(
                    <View className='absolute w-full h-full justify-center bg-black/50 rounded-full'>
                      <ActivityIndicator color="#2563EB" size="small"/>
                    </View>
                  )}
                  <TouchableOpacity className='absolute bottom-1 right-0'
                  disabled={isLoading}
                  onPress={handleAvatarPicker}
                  >
                    <CustomIcon size={12} name="SquarePen" />
                  </TouchableOpacity>
                  </TouchableOpacity>
                 {editAvatar &&(
                   <TouchableOpacity className='mt-3'
                   onPress={handleAvatarChange}
                   disabled={isLoading}
                   >
                  <Text className='text-primary-600 font-bold text-center'>Update</Text>
                  </TouchableOpacity>
                 )}
              <View className=''>
                  <Text className='text-2xl font-rubik-bold dark:text-white' numberOfLines={1}>{user.fullname}</Text>
                  <Text className='text-gray-600 dark:text-gray-300 text-sm'>@{user.username}</Text>
                  <Text className='text-gray-600 dark:text-gray-300 text-sm'>@{user.username}</Text>
                </View>
              </View>
              <SubscribedButton className='py-2'/>      
              </View></>
      )
    }


const Channel = () => {

  return (
     <Tabs.Container
      renderHeader={Header}
      headerHeight={HEADER_HEIGHT}
      revealHeaderOnScroll={true}
      snapThreshold={0.5} 
      renderTabBar={(props) => (
    <MaterialTabBar
       {...props}
      activeColor="#2563EB"
      inactiveColor="black"
      indicatorStyle={{ backgroundColor: '#2563EB', height: 3 }}
      contentContainerStyle={{ flex:1, justifyContent:"space-between", alignContent:"center", padding:8}}
      labelStyle={{ fontWeight: 'bold', textAlign: 'center' }}
    />
     )}
    >
      <Tabs.Tab name="Videos">
        
      </Tabs.Tab>
      <Tabs.Tab name="Playlist">
        <ScrollView>
          <View style={[styles.box, styles.boxA]} />
          <View style={[styles.box, styles.boxB]} />
        </ScrollView>
      </Tabs.Tab>
      <Tabs.Tab name="Post">
        <ScrollView className='bg-white'>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
        </ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  )
}
const styles = StyleSheet.create({
  box: {
    height: 250,
    width: '100%',
  },
  boxA: {
    backgroundColor: 'white',
  },
  boxB: {
    backgroundColor: '#D8D8D8',
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: '#2196f3',
  },
})
export default Channel