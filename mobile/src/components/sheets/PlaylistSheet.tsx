import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import { StyleSheet } from 'react-native';
import Icon from '../../constants/Icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useColorScheme } from 'nativewind';
import { RadioButton } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import {
  usePlaylistAddVideoMutation,
  useUserPlaylistQuery,
} from '../../redux/api/playlistApi';
import { RootState } from '../../redux/store';
import { ToastShow } from '../../utils/Tost';
import GlobalLoader from '../GlobalLoader';
import CustomButton from '../CustomButton';

const PlaylistSheet = (props: SheetProps<'playlist-sheet'>) => {
  const { user } = useSelector((state: RootState) => state.user);
  const sheet_id = props.payload?.entityId;
  // console.log('id', sheet_id);
  const { colorScheme } = useColorScheme();
  const [isSelected, setSelection] = useState<string | null>(null);
  const { data, isLoading } = useUserPlaylistQuery({ userId: user?._id });
  const [playlistAddVideo, { isLoading: addPlaylistVideoLoding }] =
    usePlaylistAddVideoMutation();

  // handle add video in playlist
  const handleAddVideoPlaylist = async () => {
    try {
      const addedVideoPlaylist = await playlistAddVideo({
        videoId: sheet_id,
        playlistId: isSelected,
      }).unwrap();
      console.log('video add in playlist ', addedVideoPlaylist);
      SheetManager.hide(props.sheetId);
      ToastShow(addedVideoPlaylist.message);
      setSelection(null);
    } catch (errr) {
      console.log('Error', errr);
      ToastShow(errr.data.message, 'danger');
    }
  };

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
      containerStyle={{
        backgroundColor: colorScheme === 'light' ? '#FFFFFF' : '#071825',
      }}
    >
      <SafeAreaView className="px-4 pb-3">
        <Text className="mt-5 mb-5 text-center font-rubik-semibold text-primary-600">
          Add video in playlists
        </Text>
        <FlatList
          data={!isLoading ? data.data : [1, 2, 3, 4, 5, 6, 7]}
          keyExtractor={(video, index) =>
            !isLoading ? video._id : index.toString()
          }
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pt-2 gap-5 pb-14"
          renderItem={({ item }) =>
            !isLoading ? (
              <TouchableOpacity
                disabled={addPlaylistVideoLoding}
                onPress={() => {
                  if (isSelected === item._id) {
                    setSelection(null);
                  } else {
                    setSelection(item._id);
                  }
                }}
                className="flex flex-row items-center justify-between"
              >
                <View className="flex flex-row items-center gap-3">
                  <Icon
                    name="ListVideo"
                    size={20}
                    // color={iconColor}
                  />
                  <Text
                    className={`text-lg font-rubik-medium text-black-300 dark:text-white`}
                  >
                    {item.name}
                  </Text>
                </View>
                <RadioButton
                  color="white"
                  value={'playlist'}
                  status={isSelected === item._id ? 'checked' : 'unchecked'}
                  // color="2563EB"
                  onPress={() => {
                    if (isSelected === item._id) {
                      setSelection(null);
                    } else {
                      setSelection(item._id);
                    }
                  }}
                />
              </TouchableOpacity>
            ) : (
              <GlobalLoader />
            )
          }
        />
        {isSelected !== null && (
          <CustomButton
            title="Add to playlist"
            isLoading={addPlaylistVideoLoding || isLoading}
            handlePress={handleAddVideoPlaylist}
          />
        )}
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
});

export default PlaylistSheet;
