import { useColorScheme } from "nativewind"
import { Dimensions, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const VideoListCardLoader = () => {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
  const { colorScheme } = useColorScheme()
  const { width: SCREEN_WIDTH } = Dimensions.get('window')
  const cardWidth = SCREEN_WIDTH * 0.45;
  const shimmerColors =
    colorScheme === 'dark'
      ? ['#22313F', '#506A85', '#22313F'] 
      : ['#ebebeb', '#c5c5c5', '#ebebeb'] 

  return (
    <View className="flex-row gap-2">
      <ShimmerPlaceholder
        style={{ width: cardWidth, height: cardWidth * 10 / 16, borderRadius: 12 }}
        shimmerColors={shimmerColors}
      />

      {/* Text placeholders */}
      <View className="flex-1 gap-2 mt-2">
        <ShimmerPlaceholder style={{ width: '100%', height: 13, borderRadius: 9999 }} shimmerColors={shimmerColors} />
        <ShimmerPlaceholder style={{ width: '100%', height: 13, borderRadius: 9999 }} shimmerColors={shimmerColors} />
        <ShimmerPlaceholder style={{ width: 128, height: 11, borderRadius: 9999 }} shimmerColors={shimmerColors} />
        <ShimmerPlaceholder style={{ width: 60, height: 10, borderRadius: 9999 }} shimmerColors={shimmerColors} />
      </View>
    </View>
  )
}

export default VideoListCardLoader
