import { View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'




const VideoListCardLoader= () => {
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
  
  return (
    <View className='flex-row gap-2 px-4'>
      <View className="w-48 h-28 rounded-xl overflow-hidden bg-secondary">
        <ShimmerPlaceholder style={{ flex: 1, width: "100%", borderRadius: 12}} />
      </View>
      <View className='flex-1 gap-2'>
        <View className='rounded-full bg-secondary overflow-hidden'>
            <ShimmerPlaceholder style={{ flex: 1, width: "100%",}} />
        </View>
        <View className='rounded-full bg-secondary overflow-hidden'>
            <ShimmerPlaceholder style={{ flex: 1, width: "100%", }} />
        </View>
        <View className='w-32 rounded-full overflow-hidden bg-secondary'>
            <ShimmerPlaceholder style={{ flex: 1, width: "100%"}} />
        </View>
        <View className='w-24 rounded-full overflow-hidden bg-secondary'>
            <ShimmerPlaceholder style={{ flex: 1, width: "100%"}} />
        </View>
      </View>
    </View>
  )
}

export default VideoListCardLoader