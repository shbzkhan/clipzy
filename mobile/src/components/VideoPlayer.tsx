import { useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, Image, StatusBar, BackHandler } from 'react-native'
import Video from 'react-native-video'
import ImageIcon from '../constants/ImageIcon'
import Slider from '@react-native-community/slider'
import { format } from '../constants/TimeFormat'
import Orientation from "react-native-orientation-locker"
import { ActivityIndicator } from 'react-native-paper'

const VideoPlayer = () => {
  const [clicked, setClicked] = useState<boolean>(true)
  const [paushed, setPaushed] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [buffuring, setBuffuring] = useState<boolean>(false)
  const ref = useRef([])
  const [progress, setProgress] = useState(0)
  const [fullScreen, setFullScreen] = useState<boolean>(false)

  useEffect(() => {
    const backAction = () => {
      if (fullScreen) {
        // Agar fullscreen me hai → portrait pe wapas le aao
        Orientation.lockToPortrait();
        StatusBar.setHidden(false, "slide");
        setFullScreen(false);
        return true; // Back press consume ho gaya
      }
      return false; // Normal back behavior
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, [fullScreen]);

  const toggleFullscreen = () => {
    if (fullScreen) {
      Orientation.lockToPortrait();
      StatusBar.setHidden(false, "slide");
    } else {
      Orientation.lockToLandscape();
      StatusBar.setHidden(true, "slide");
    }
    setFullScreen(!fullScreen);
  };
  return (
    <View className={`w-full ${fullScreen?"h-screen":"h-[200px]"} relative`}>
  <Video
  paused={paushed}
    source={{ uri: 'https://videos.pexels.com/video-files/1196530/1196530-hd_1920_1080_30fps.mp4' }}
    style={{ width: '100%', height: fullScreen? "100%": 200 }}
    resizeMode="contain"
    ref={ref}
    onLoadStart={()=>setLoading(true)}
    onLoad={()=>setLoading(false)}
    onBuffer={({isBuffering})=>setBuffuring(isBuffering)}
    onProgress={(x) => {
    setProgress(x);
    console.log(x)
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
        <View className={`absolute ${fullScreen?"bottom-0":"-bottom-2"} w-full`}>
          <View className='flex-row justify-between px-4 '>
            <View className='bg-black/30 flex-row px-2 py-1 rounded-full'>
               <Text className='text-white text-sm'>{format(progress.currentTime)} </Text>
               <Text className='text-gray-300 text-sm'>/ {format(progress.seekableDuration)}</Text>
            </View>
            <TouchableOpacity
         onPress={toggleFullscreen}
          >
            <Image
          source={fullScreen?ImageIcon.minimize: ImageIcon.fullscreen}
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