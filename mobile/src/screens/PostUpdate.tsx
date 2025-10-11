import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import UserLogo from '../components/UserLogo';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../components/Header/CustomHeader';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from '../constants/Icons';
import CustomButton from '../components/CustomButton';
import {
  useGetVideoByIdQuery,
  useVideoUpdateMutation,
} from '../redux/api/videoApi';
import { ToastShow } from '../utils/Tost';
import GlobalLoader from '../components/GlobalLoader';
import { goBack } from '../navigation/NavigationUtils';

const PostUpdate = () => {
  const route = useRoute();
  const { video_id } = route.params;
  const { user } = useSelector((state: RootState) => state.user);
  const [thumbnail, setThumbnail] = useState('');
  const [desc, setDesc] = useState('');
  const [title, setTitle] = useState('');
  const { data, isLoading: seachVideoLoading } = useGetVideoByIdQuery({
    videoId: video_id,
  });
  const [videoUpdate, { isLoading }] = useVideoUpdateMutation();
  console.log(data);

  useEffect(() => {
    if (!seachVideoLoading) {
      setTitle(data.data.title);
      setThumbnail(data?.data.thumbnail);
      setDesc(data.data.description);
    }
  }, [seachVideoLoading]);
  const handleThumbPicker = async () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 623,
      cropping: true,
      freeStyleCropEnabled: false,
      compressImageQuality: 0.8,
      mediaType: 'photo',
    }).then(image => {
      console.log(image.path);
      setThumbnail(image.path);
    });
  };

  const handleVideoUpdate = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', desc);

    // Append thumbnail only if it’s local or Cloudinary
    if (thumbnail && !thumbnail.startsWith('http')) {
      formData.append('thumbnail', {
        uri: thumbnail,
        type: 'image/jpeg',
        name: 'thumbnail.jpg',
      });
    }
    try {
      const updateVideo = await videoUpdate({ video_id, formData }).unwrap();
      console.log('updatedVideo', updateVideo);
      ToastShow(updateVideo.message);
      goBack()
    } catch (error) {
      console.log('error ', error);
      ToastShow(error.data.message, 'danger');
    }
  };

  if (seachVideoLoading) {
    return <GlobalLoader />;
  }
  return (
    <SafeAreaView className="flex-1 gap-4 bg-white">
      <CustomHeader title="Update Post" />
      <TouchableOpacity className="relative" onPress={handleThumbPicker}>
        <Image
          source={{ uri: data?.data.thumbnail }}
          className="w-full h-[200px]"
          resizeMode="cover"
        />
        <View className="absolute top-0 flex items-center justify-center w-full h-full ">
          <View className="p-10 overflow-hidden rounded-full bg-black/50">
            <Icon name="Camera" />
          </View>
        </View>
      </TouchableOpacity>
      <View className="flex-row items-center gap-2 px-3">
        <View className="flex-1">
          <TextInput
            className="px-2 text-black align-top border rounded-md font-rubik-bold dark:text-white border-primary-300"
            placeholder="Write your title"
            value={title}
            onChangeText={e => setTitle(e)}
          />
        </View>
      </View>
      <View className="gap-5 px-3">
        <TextInput
          value={desc}
          className="px-2 align-top border rounded-md font-rubik h-52 border-primary-300"
          placeholder="Write you description"
          multiline
          onChangeText={e => setDesc(e)}
        />
        <CustomButton
          title="Update Post"
          handlePress={handleVideoUpdate}
          isLoading={isLoading}
        />
      </View>
    </SafeAreaView>
  );
};

export default PostUpdate;
