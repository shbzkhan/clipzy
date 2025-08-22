import { useRef, useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import Video from 'react-native-video'
import ImageIcon from '../constants/ImageIcon'
import Slider from '@react-native-community/slider'
import { format } from '../constants/TimeFormat'

const VideoPlayer = () => {
  const [clicked, setClicked] = useState<boolean>(false)
  const [paushed, setPaushed] = useState<boolean>(false)
  const ref = useRef<object>([])
  const [progress, setProgress] = useState(null)
  const [fullScreen, setFullScreen] = useState<boolean>(false)
  return (
    <View className="w-full h-[200px] relative">
  <Video
  paused={paushed}
    source={{ uri: 'https://videos.pexels.com/video-files/1196530/1196530-hd_1920_1080_30fps.mp4' }}
    style={{ width: '100%', height: 200 }}
    resizeMode="contain"
    ref={ref}
    onProgress={(x) => {
    setProgress(x);
    console.log(x)
    if (x.currentTime === x.seekableDuration) {
      setPaushed(true)
    }
  }}
  />

  {/* Transparent touchable overlay */}
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
        <View className='flex-row gap-16'>
          <TouchableOpacity className='bg-black/30 w-12 h-12 rounded-full justify-center items-center'
          onPress={()=> ref.current.seek(parseInt(progress.currentTime)-10)}>
            <Image
          source={ImageIcon.backward}
          className='w-4 h-4'
          resizeMode='contain'
          tintColor="white"
          />
          </TouchableOpacity>
          <TouchableOpacity className='bg-black/30 w-16 h-16 rounded-full justify-center items-center'
          onPress={()=>setPaushed(!paushed)}
          >
            <Image
          source={paushed?ImageIcon.play : ImageIcon.pause}
          className='w-6 h-6'
          resizeMode='contain'
          tintColor="white"
          />
          </TouchableOpacity>
          <TouchableOpacity className='bg-black/30 w-12 h-12 rounded-full justify-center items-center'
          onPress={()=> ref.current.seek(parseInt(progress.currentTime)+10)}
          >
            <Image
          source={ImageIcon.forward}
          className='w-4 h-4'
          resizeMode='contain'
          tintColor="white"
          />
          </TouchableOpacity>
        
        </View>
        <View className='absolute -bottom-2 w-full'>
          <View className='flex-row justify-between px-4 '>
            <View className='bg-black/30 flex-row px-2 py-1 rounded-full'>
               <Text className='text-white text-sm'>{format(progress.currentTime)} </Text>
               <Text className='text-gray-300 text-sm'>/ {format(progress.seekableDuration)}</Text>
            </View>
            <TouchableOpacity
          onPress={()=>setPaushed(!paushed)}
          >
            <Image
          source={ImageIcon.fullscreen}
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