import { useColorScheme } from 'nativewind'
import { View } from 'react-native'
import LinearGradient from "react-native-linear-gradient"
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const VideoCardLoader = () => {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
  const { colorScheme } = useColorScheme()

  const shimmerColors =
    colorScheme === 'dark'
      ? ['#22313F', '#506A85', '#22313F'] 
      : ['#ebebeb', '#c5c5c5', '#ebebeb'] 

  return (
    <View className="gap-4">
      <ShimmerPlaceholder
        style={{ width: '100%', height: 200 }}
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
