import { useColorScheme } from 'nativewind'
import { Dimensions, View } from 'react-native'
import LinearGradient from "react-native-linear-gradient"
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const VideoCardLoader = () => {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  const { colorScheme } = useColorScheme()
  const { width: SCREEN_WIDTH } = Dimensions.get('window')

  const shimmerColors =
    colorScheme === 'dark'
      ? ['#22313F', '#506A85', '#22313F'] 
      : ['#ebebeb', '#c5c5c5', '#ebebeb'] 

       const thumbnailHeight = SCREEN_WIDTH * 9 / 16
  return (
    <View className="gap-4">
      <ShimmerPlaceholder
        visible={false}
        style={{ width: SCREEN_WIDTH,  height: thumbnailHeight, }}
        shimmerColors={shimmerColors}
      />

      <View className="flex-row items-center gap-2 px-3">
        <ShimmerPlaceholder
          style={{ width: 48, height: 48, borderRadius: 9999 }}
          shimmerColors={shimmerColors}
        />

        <View className="flex-1 gap-2">
          <ShimmerPlaceholder
            style={{ width: '100%', height: 16, borderRadius: 4 }}
            shimmerColors={shimmerColors}
          />
          <ShimmerPlaceholder
            style={{ width: '100%', height: 16, borderRadius: 4 }}
            shimmerColors={shimmerColors}
          />
          <ShimmerPlaceholder
            style={{ width: '33%', height: 16, borderRadius: 4 }}
            shimmerColors={shimmerColors}
          />
        </View>
      </View>
    </View>
  )
}

export default VideoCardLoader
