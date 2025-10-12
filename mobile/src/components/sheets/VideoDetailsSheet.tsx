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
import { ToastLoading, ToastLoadShow, ToastShow } from '../../utils/Tost';
import { Toast } from "react-native-toast-notifications"
import { handleShareToSocialMedia } from '../../utils/ShareToSocialMedia';
import { usePlaylistDeleteVideoMutation } from '../../redux/api/playlistApi';

const VideoDetailsSheet = (props: SheetProps<'videoDetails-sheet'>) => {
  const { user } = useSelector((state: RootState) => state.user);
  const {video_id, owner_id, isPlaylist, playlistId} = props.payload?.entityId;
  const { colorScheme } = useColorScheme();

 //api's
  const [videoDelete] = useVideoDeleteMutation()
  const [playlistDeleteVideo]  = usePlaylistDeleteVideoMutation()

  
 // video delete handler
  const handleVideoDeletion = async() =>{
        try {
          SheetManager.hide(props.sheetId)
          ToastShow("Video Deleting in progess please wait...")
          const deletedVideo = await videoDelete(video_id).unwrap()
          ToastShow(deletedVideo.message)
        } catch (error) {
          ToastShow(error.data.message,"danger")
        }
      }
      
      
// video delete form playlist handler
  const handleDeleteVideoFromPlaylist =async() =>{
    try {
      SheetManager.hide(props.sheetId)
      const toastId = ToastLoading("Video removing form palylist...")
      const deletedVideo = await playlistDeleteVideo({videoId:video_id, playlistId}).unwrap()
      ToastShow(deletedVideo?.message,"success",toastId)
    } catch (error) {
      ToastShow(errr.data.message, 'danger',toastId)
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
        height:(owner_id === user?._id)?isPlaylist?"45%":"40%":isPlaylist?"35%":"30%",
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
                      onPress={()=>{
                        navigate("PostUpdate",{
                        video_id,
                      })
                      SheetManager.hide(props.sheetId)
                    }
                    }
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
              {
                isPlaylist &&(
                  <SettingsItem
                  icon={"Trash2"}
                  onPress={handleDeleteVideoFromPlaylist}
                  showArrow={false}
                  title='Remove from playlist'
                /> 
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
