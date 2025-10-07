import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import ActionSheet, {
    SheetManager,
    SheetProps,
} from 'react-native-actions-sheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import SettingsItem from '../SettingsItem';
import { View } from 'react-native';
import { navigate } from '../../navigation/NavigationUtils';
import { useVideoDeleteMutation } from '../../redux/api/videoApi';
import { ToastLoadShow, ToastShow } from '../../utils/Tost';
import { Toast } from "react-native-toast-notifications"
import { handleShareToSocialMedia } from '../../utils/ShareToSocialMedia';

const VideoDetailsSheet = (props: SheetProps<'videoDetails-sheet'>) => {
  const { user } = useSelector((state: RootState) => state.user);
  const {video_id, owner_id} = props.payload?.entityId;
  const { colorScheme } = useColorScheme();

  // video delete handler
  const [videoDelete, {isLoading}] = useVideoDeleteMutation()
  const handleVideoDeletion = async() =>{
        try {
          SheetManager.hide(props.sheetId)
          ToastShow("Video Deleting in progess please wait...")
          const deletedVideo = await videoDelete(video_id).unwrap()
          ToastShow(deletedVideo.message)
        } catch (error) {
          console.log("Error", error.message)
          ToastShow(error.data.message,"danger")
        }
  }
  

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
        height:(owner_id === user?._id)?"40%":"30%",
      }}
    >
      <SafeAreaView className="px-4 pb-3">
        <Text className="mt-5 mb-5 text-center font-rubik-semibold text-primary-600">
          Video Details
        </Text>
        <View>
          <SettingsItem
              icon={"UserRoundPen"}
              onPress={()=>{
                SheetManager.hide(props.sheetId)
                navigate("Video",{id:video_id})
              }}
              title='Play Video'
            />
            <SettingsItem
              icon={"ListVideo"}
              onPress={()=>{
                SheetManager.show('playlist-sheet', {
                  payload: {
                    entityId: video_id,
                  },
                }).then(()=>{
                  SheetManager.hide(props.sheetId)
                })
              }}
              title='Save in Playlist'
            />
            <SettingsItem
                icon={"Forward"}
                onPress={()=>{
                  SheetManager.hide(props.sheetId)
                  handleShareToSocialMedia({
                      url_id:video_id
                    }
                  )
                }}
                title='Share'
              />
              {
                (owner_id === user?._id) && (
                  <>
                  <SettingsItem
                      icon={"UserRoundPen"}
                      onPress={()=>navigate("")}
                      title='Edit Video'
                    />
                    <SettingsItem
                      icon={"Trash2"}
                      onPress={handleVideoDeletion}
                      title='Delete Video'
                      iconColor='red'
                      showArrow={false}
                      textStyle='text-danger dark:text-danger'
                    />
                  </>
                )
              }
            
        </View>
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

export default VideoDetailsSheet;
