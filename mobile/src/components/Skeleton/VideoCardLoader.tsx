import { View } from 'react-native'
import LinearGradient from "react-native-linear-gradient"
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const VideoCardLoader = () => {
  return (
    <View className="gap-4">
      {/* Thumbnail */}
      <View className="w-full h-[200px] rounded-xl bg-secondary">
        <ShimmerPlaceholder style={{ flex: 1, width: "100%" }} />
      </View>

      {/* Avatar + Text */}
      <View className="px-3 flex-row gap-2 items-center">
        <View className="w-12 h-12 rounded-full overflow-hidden bg-secondary">
          <ShimmerPlaceholder style={{ flex: 1, borderRadius: 9999, }} />
        </View>

        <View className="flex-1 gap-2">
          <View className="w-full h-4 rounded-full overflow-hidden bg-secondary">
            <ShimmerPlaceholder style={{ flex: 1, width: "100%" }} />
          </View>
          <View className="w-full h-4 rounded-full overflow-hidden bg-secondary">
            <ShimmerPlaceholder style={{ flex: 1, width: "100%" }} />
          </View>
          <View className="w-2/6 h-4 rounded-full overflow-hidden bg-secondary">
            <ShimmerPlaceholder style={{ flex: 1, width: "100%" }} />
          </View>
        </View>
      </View>
    </View>
  )
}

export default VideoCardLoader
