import { useColorScheme } from 'nativewind'
import { View } from 'react-native'
import LinearGradient from "react-native-linear-gradient"
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const CommentCardLoader = () => {
     const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
      
  return (
    <View className="flex-row items-start gap-3 p-2 py-2">
      {/* Avatar shimmer */}
      <ShimmerPlaceholder
        style={{ height: 36, width: 36, borderRadius: 9999, }}
        shimmerColors={['#22313F', '#506A85', '#22313F']}
      />

      <View className="flex-1 gap-2">
        {/* Username + Time shimmer */}
        <ShimmerPlaceholder
          style={{ height: 10, width: '60%', borderRadius: 4 }}
          shimmerColors={['#22313F', '#506A85', '#22313F']}
        />

        {/* Comment text shimmer */}
        <ShimmerPlaceholder
          style={{ height: 12, width: '90%', borderRadius: 4 }}
          shimmerColors={['#22313F', '#506A85', '#22313F']}
        />

        {/* Action buttons shimmer (like, share) */}
        <View className="flex-row gap-5 mt-1">
          <ShimmerPlaceholder style={{ height: 10, width: 30, borderRadius: 4 }} shimmerColors={['#22313F', '#506A85', '#22313F']} />
          <ShimmerPlaceholder style={{ height: 10, width: 40, borderRadius: 4 }} shimmerColors={['#22313F', '#506A85', '#22313F']} />
        </View>
      </View>
    </View>
  )
}

export default CommentCardLoader