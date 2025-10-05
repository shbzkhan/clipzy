import { View, Text } from 'react-native'
import React, { FC } from 'react'

interface EmptyStateProps {
  title:string
  description:string
}
const EmptyState:FC<EmptyStateProps> = ({title, description}) => {
  return (
    <View className="items-center justify-center flex-1 gap-5 bg-white dark:bg-dark">
          <Text className="text-2xl dark:text-white font-rubik-bold">{title}</Text>
          <Text className="text-gray-400 dark:text-gray-400 font-rubik">{description}</Text>
    </View>
  )
}

export default EmptyState