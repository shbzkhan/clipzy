import { FC, useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, Image, StatusBar, BackHandler, Platform } from 'react-native'
import Video from 'react-native-video'
import ImageIcon from '../constants/ImageIcon'
import Slider from '@react-native-community/slider'
import { format } from '../constants/TimeFormat'
import Orientation from "react-native-orientation-locker"
import { ActivityIndicator } from 'react-native-paper'
import { Immersive } from 'react-native-immersive'
import { VideoIdData } from '../types/video'

const VideoPlayer:FC<VideoById> = ({data}) => {
  console.log("VideoPlayer", data)
  const [clicked, setClicked] = useState<boolean>(true)
  const [paushed, setPaushed] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [buffuring, setBuffuring] = useState<boolean>(false)
  const ref = useRef([])
  const [progress, setProgress] = useState<any>(0)
  const [fullscreen, setFullscreen] = useState<boolean>(false)

  //video fetching
  

useEffect(() => {
    const backAction = () => {
      if (fullscreen) {
        exitFullscreen(); // agar fullscreen hai to pehle exit kare
        return true; // default back action cancel
      }
      return false; // normal back kaam kare
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [fullscreen]);

  const enterFullscreen = () => {
    setFullscreen(true);
    Orientation.lockToLandscape();
    if (Platform.OS === "android") {
      Immersive.on();
      Immersive.setImmersive(true);
    }
    StatusBar.setHidden(true);
  };

  const exitFullscreen = () => {
    setFullscreen(false);
    Orientation.lockToPortrait();
    if (Platform.OS === "android") {
      Immersive.off();
      Immersive.setImmersive(false);
    }
    StatusBar.setHidden(false);
  };

  const toggleFullscreen = () => {
    fullscreen ? exitFullscreen() : enterFullscreen();
  };
  return (
    <View className={`w-full ${fullscreen?"h-screen":"h-[200px]"} relative bg-black/60`}>
  <Video
    paused={paushed}
    source={{ uri: data.videoFile}}
    style={{ width: '100%', height: fullscreen? "100%": 200 }}
    resizeMode={fullscreen?"contain":"cover"}
    ref={ref}
    onLoadStart={()=>setLoading(true)}
    onLoad={()=>setLoading(false)}
    onBuffer={({isBuffering})=>setBuffuring(isBuffering)}
    onProgress={(x) => {
    setProgress(x);
    if (x.currentTime === x.seekableDuration) {
      setPaushed(true)
    }
  }}
  />
  <TouchableOpacity
    className="absolute top-0 left-0 w-full h-full"
    onPress={() => {
      setClicked(true)
    }}
    activeOpacity={1}
  >
    
    {clicked && (
      <TouchableOpacity className="w-full h-full bg-[rgba(0,0,0,0.5)] justify-center items-center relative"
      onPress={() => {
      setClicked(false)
    }} >
      {
        (loading || buffuring)?
          <View className="absolute top-0 left-0 w-full h-full justify-center items-center bg-[rgba(0,0,0,0.5)]">
            <ActivityIndicator size={"large"} color='white'/>
          </View>
      :
        <View className='flex-row gap-16'>
          <TouchableOpacity className='bg-black/30 w-12 h-12 rounded-full justify-center items-center'
          onPress={()=> ref.current.seek(parseInt(progress.currentTime)-10)}>
            <Image
          source={ImageIcon.backward}
          className='w-6 h-6'
          resizeMode='contain'
          tintColor="white"
          />
          </TouchableOpacity>
          <TouchableOpacity className='bg-black/30 w-16 h-16 rounded-full justify-center items-center'
          onPress={()=>setPaushed(!paushed)}
          >
            <Image
          source={paushed?ImageIcon.play : ImageIcon.pause}
          className='w-8 h-8'
          resizeMode='contain'
          tintColor="white"
          />
          </TouchableOpacity>
          <TouchableOpacity className='bg-black/30 w-12 h-12 rounded-full justify-center items-center'
          onPress={()=> ref.current.seek(parseInt(progress.currentTime)+10)}
          >
            <Image
          source={ImageIcon.forward}
          className='w-6 h-6'
          resizeMode='contain'
          tintColor="white"
          />
          </TouchableOpacity>
        
        </View>
      }
        <View className={`absolute ${fullscreen?"bottom-6":"-bottom-2"} w-full`}>
          <View className='flex-row justify-between px-4 '>
            <View className='bg-black/30 flex-row px-2 py-1 rounded-full'>
               <Text className='text-white text-sm'>{progress.currentTime?format(progress.currentTime):"00:00"} </Text>
               <Text className='text-gray-300 text-sm'>/ {progress.currentTime?format(progress.seekableDuration):"00:00"}</Text>
            </View>
            <TouchableOpacity
         onPress={toggleFullscreen}
          >
            <Image
          source={fullscreen?ImageIcon.minimize: ImageIcon.fullscreen}
          className='w-6 h-6'
          resizeMode='contain'
          tintColor="white"
          />
          </TouchableOpacity>
          </View>
          <Slider
            minimumValue={0}
            value={progress.currentTime}
            maximumValue={progress.seekableDuration}
            minimumTrackTintColor="#3B82FE"
            thumbTintColor="#3B82FE"
            maximumTrackTintColor="#FFF"
            onValueChange={(x)=> ref.current.seek(x)}
          />
          </View>
      </TouchableOpacity>
    )}
  </TouchableOpacity>
</View>
  )
}

export default VideoPlayer