import { View, Text, Platform, PermissionsAndroid, TouchableOpacity, Linking,} from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import AuthBox from '../components/AuthBox'
import { useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomHeader from '../components/Header/CustomHeader'
import PickerVideoButton from '../components/post/PickerVideoButton'
import Icon from '../constants/Icons'
import { ToastShow } from '../utils/Tost'
import {CameraRoll} from "@react-native-camera-roll/camera-roll"
import { ActivityIndicator } from 'react-native-paper'
import PostCard from '../components/post/PostCard'
import { FlatList } from 'react-native'

export interface videoProp {
  uri:string;
  playbleDuration:number
}

const useGallery = ({pageSize =30})=>{
  const [videos, setVideos] = useState<videoProp[]>([])
  const [nextCurser, setNextCurser] = useState<string | undefined>(undefined)
  const [permissionNotGranted, setPermissionGranted ] = useState<boolean>(false)
  const [isLoading, setIsLoading ] = useState<boolean>(false)
  const [isLoadingNextPage, setIsLoadingNextPage ] = useState<boolean>(false)
  const [hasNextPage, setHasNextPage ] = useState<boolean>(true)

  const loadNextPagePictures = async () =>{
    if(!hasNextPage) return
    try {
      setIsLoadingNextPage(true)
      const videoData = await CameraRoll.getPhotos({
        first:pageSize,
        after:nextCurser,
        assetType:"Videos",
        include:[
          "playableDuration",
          'fileSize',
          'filename',
          "fileExtension",
          "imageSize"
        ]
      })

      const videoExtracted = videoData?.edges?.map((edge)=>({
        uri:edge.node.image.uri,
        playableDuration:edge.node.image.playableDuration,
        filePath:edge.node.image.filepath,
        filename:edge.node.image.filename,
        extenstion:edge.node.image.extension,
      }))

      setVideos(prev => [...prev, ...videoExtracted])
      setNextCurser(videoData.page_info.end_cursor)
      setHasNextPage(videoData.page_info.has_next_page)
      
    } catch (error) {
      console.log(error)
      ToastShow("An error occured while fetching videos", "danger")
    }finally{
      setIsLoadingNextPage(false)
    }
  }

  const hasAndroidPermission = async()=>{
    if(Platform.Version as number >=33){
      const statuses = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ])
      return(
        statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] === PermissionsAndroid.RESULTS.GRANTED &&
        statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] === PermissionsAndroid.RESULTS.GRANTED
      )
    }else{
      const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
      return status === PermissionsAndroid.RESULTS.GRANTED
    }
  }

  const fetchInitial = async()=>{
    const hasPermission = await hasAndroidPermission()
    if(!hasPermission){
      setPermissionGranted(true)
    }else{
      setIsLoading(true)
      await loadNextPagePictures()
      setIsLoading(false)
    }
  }
  
  const fetchVideos = async()=>{
      setIsLoading(true)
      await loadNextPagePictures()
      setIsLoading(false)
  }
  
  
  useEffect(()=>{
    if(Platform.OS === "ios"){
      fetchVideos()
    }else{
      fetchInitial()
    }
  },[])

  return{
    videos,
    loadNextPagePictures,
    isLoading,
    permissionNotGranted,
    isLoadingNextPage,
    hasNextPage
  }
}

const Post:FC = () => {
  const {
    videos,
    loadNextPagePictures,
    isLoading,
    hasNextPage,
    isLoadingNextPage,
    permissionNotGranted
  } = useGallery({pageSize:30})

console.log(videos)



const renderFooter =()=>{
  if(!isLoadingNextPage) return null
  return <ActivityIndicator color="#2563EB" size="small"/>
}

  const user = useSelector((state:any)=>state.user.user)
  if(!user) return <AuthBox name="Video Creation"/>
  return (
    <SafeAreaView className='flex-1 bg-white dark:bg-dark'>
      <CustomHeader title='New Video'/>
      <PickerVideoButton/>
      <View className='flex-row gap-1 items-center mt-5 px-4'>
        <Text className='dark:text-white font-rubik-semibold text-lg'>Recent</Text>
        <Icon name='ChevronDown'/>
      </View>
      {!!permissionNotGranted ?(
        <View className='flex-1 justify-center items-center px-4 gap-4'>
          <Text className='font-rubik-medium text-xl dark:text-gray-300 text-center'>We need permission to access your gallery</Text>
          <TouchableOpacity onPress={()=>Linking.openSettings()}>
            <Text className='font-rubik-semibold text-xl dark:text-white'>Open Settings</Text>
          </TouchableOpacity>
        </View>
      ):(
        <>
          {isLoading ?(
            <ActivityIndicator color="#2563EB" size="large"/>
          ):(
            <FlatList
            data={videos}
            keyExtractor={(item, index)=>index.toString()}
            contentContainerClassName='gap-1'
            columnWrapperClassName='gap-1'
            onEndReached={loadNextPagePictures}
            onEndReachedThreshold={0.5}
            numColumns={3}
            renderItem={({item})=>(
              <PostCard item={item}/>
            )}
            ListFooterComponent={renderFooter}
            />
          )}
        </>

      )}
    </SafeAreaView>
  )
}

export default Post