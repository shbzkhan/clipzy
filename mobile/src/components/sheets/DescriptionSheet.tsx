import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import { StyleSheet } from 'react-native';
import Icon from '../../constants/Icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { formatDM, formatYear } from '../../constants/DateFormat';
import { Video } from '../../types/video.types';

const DescriptionSheet = (props: SheetProps<'comment-sheet'>) => {
  // const
  const videoData: Video = props.payload?.entityId;
  return (
    <ActionSheet
      id={props.sheetId}
      headerAlwaysVisible={true}
      isModal={true}
      onClose={() => SheetManager.hide(props.sheetId)}
      gestureEnabled={true}
      keyboardHandlerEnabled={true}
      indicatorStyle={styles.indicator}
      enableGesturesInScrollView={true}
      containerStyle={styles.container}
    >
      <SafeAreaView className="h-full">
        <View className="flex-row justify-center px-4 py-4 border-b border-gray-500">
          <Text className="text-center text-white text font-rubik-bold">
            Video Details
          </Text>
        </View>
        <ScrollView contentContainerClassName="px-4 gap-3">
          <View className="gap-5 my-6">
            <Text className="text-2xl text-white font-rubik-bold">
              {videoData.title}
            </Text>
            <View className="flex-row justify-around">
              <View className="items-center">
                <Text className="text-xl text-white font-rubik-bold">
                  {videoData.likesCount}
                </Text>
                <Text className="text-sm text-gray-400 font-rubik">Likes</Text>
              </View>
              <View className="items-center">
                <Text className="text-xl text-white font-rubik-bold">
                  {videoData.views}
                </Text>
                <Text className="text-sm text-gray-400 font-rubik">Views</Text>
              </View>
              <View className="items-center">
                <Text className="text-xl text-white font-rubik-bold">
                  {formatDM(videoData.createdAt)}
                </Text>
                <Text className="text-sm text-gray-400 font-rubik">
                  {formatYear(videoData.createdAt)}
                </Text>
              </View>
            </View>
          </View>
          <View className="p-4 bg-dark-100 rounded-2xl">
            <Text className="text-lg text-white font-rubik">
              {videoData.description}
            </Text>
            {/* <TextInput
        className='w-full bg-white'
        value={desc}
        multiline={true}
        onChangeText={(e)=>setDesc(e)}
        /> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  indicator: {
    height: 4,
    width: 45,
    top: 4,
    backgroundColor: '#52525B',
  },
  container: {
    backgroundColor: '#0c263b',
    height: '74%',
  },
});

export default DescriptionSheet;
