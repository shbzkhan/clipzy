import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserLogo from '../components/UserLogo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import Icon from '../constants/Icons';
import CustomIcon from '../components/CustomIcon';
import { Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { ToastShow } from '../utils/Tost';
import {
  useAvatarMutation,
  useChangeAccountDetailsMutation,
  useCoverImageMutation,
} from '../redux/api/authApi';
import { userData } from '../redux/slice/userSlice';
import CustomHeader from '../components/Header/CustomHeader';
import ImagePicker from 'react-native-image-crop-picker';

const UserDetail = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  console.log(user);
  const [fullname, setFullname] = useState<string | undefined>(user?.fullname);
  const [avatarImage, setAvatarImaage] = useState<string>(user?.avatar);
  const [coverImg, setCoverImg] = useState<string | null>(user?.coverImage);
  const [editable, setEditable] = useState<boolean>(false);
  const [editAvatar, setEditAvatar] = useState<boolean>(false);
  const [avatar, { isLoading }] = useAvatarMutation();
  const [coverImage, { isLoading: coverLoading }] = useCoverImageMutation();
  const [changeAccountDetails, { isLoading: updatingDetails }] =
    useChangeAccountDetailsMutation();

  const handleAvatarPicker = async () => {
    setEditAvatar(false);
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
      cropperCircleOverlay: true,
      compressImageQuality: 0.8,
      mediaType: 'photo',
    }).then(image => {
      console.log(image.path);
      setAvatarImaage(image.path);
      setEditAvatar(true);
      handleAvatarChange(image.path);
    });
  };
  const handleAvatarChange = async (imgUri: string) => {
    console.log('imageUri', imgUri);
    const formData = new FormData();
    formData.append('avatar', {
      uri: imgUri,
      name: `avatar_${Date.now()}.jpg`,
      type: 'image/jpeg',
    });
    try {
      const updateAvatar = await avatar(formData).unwrap();
      dispatch(userData({ ...user, avatar: imgUri }));
      ToastShow(updateAvatar.message);
    } catch (error) {
      setAvatarImaage(user?.avatar);
      console.log(error);
      ToastShow('Avatar Updation Failed', 'danger');
    }
  };

  const handleCoversPicker = async () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 535,
      cropping: true,
      freeStyleCropEnabled: false,
      compressImageQuality: 0.8,
      mediaType: 'photo',
    }).then(image => {
      console.log(image.path);
      setCoverImg(image.path);
      handleCoverChange(image.path);
    });
  };

  const handleCoverChange = async (imageUri: string) => {
    const formData = new FormData();
    formData.append('coverImage', {
      uri: imageUri,
      name: `coverImage_${Date.now()}.jpg`,
      type: 'image/jpeg',
    });
    try {
      const updateCover = await coverImage(formData).unwrap();
      console.log('coverUpdate', updateCover);
      dispatch(userData({ ...user, coverImage: imageUri }));
      ToastShow(updateCover.message);
    } catch (error) {
      setCoverImg(user?.coverImage || null);
      console.log(error);
      ToastShow('Cover Image Updation Failed', 'danger');
    }
  };

  const handleChangeAccountDetails = async () => {
    try {
      const updatedAccountDetails = await changeAccountDetails({ fullname }).unwrap()
      console.log(updatedAccountDetails)
      ToastShow(updatedAccountDetails.message);
      dispatch(userData({ ...user, fullname: updatedAccountDetails.data.fullname }));
      setEditable(false)
    } catch (error) {
      console.log('error ', error);
      ToastShow(error.data.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-dark ">
      <KeyboardAvoidingView behavior="padding">
        <ScrollView
          contentContainerClassName="flex-col gap-8"
          showsVerticalScrollIndicator={false}
        >
          <View className="h-48 w-ful">
            {/* <View className='w-52'></View> */}
            {coverImg ? (
              <TouchableOpacity
                onPress={handleCoversPicker}
                disabled={coverLoading}
              >
                <Image
                  source={{ uri: coverImg }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                {coverLoading && (
                  <View className="absolute items-center justify-center w-full h-full bg-black/50">
                    <ActivityIndicator color="#2563EB" size="large" />
                  </View>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="w-full h-full bg-secondary dark:bg-black/30"
                onPress={handleCoverPicker}
              >
                <View className="items-center justify-center h-full">
                  <Icon name="Camera" size={38} />
                </View>
              </TouchableOpacity>
            )}

            <View className="relative ml-4 bottom-20 w-36 h-36">
              <TouchableOpacity
                className=" w-36"
                disabled={isLoading}
                onPress={handleAvatarPicker}
              >
                <Image
                  source={{ uri: avatarImage }}
                  className="rounded-full w-36 h-36"
                  resizeMode="cover"
                />

                {isLoading && (
                  <View className="absolute justify-center w-full h-full rounded-full bg-black/50">
                    <ActivityIndicator color="#2563EB" size="small" />
                  </View>
                )}
                <TouchableOpacity
                  className="absolute bottom-4 right-2"
                  disabled={isLoading}
                  onPress={handleAvatarPicker}
                >
                  <CustomIcon name="SquarePen" />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </View>
          <View className="gap-8 px-4 mt-10">
            <TouchableOpacity onPress={() => setEditable(!editable)}>
              <Text className="pr-6 text-right text-primary-600 font-rubik-semibold">
                {editable ? 'Cancel' : 'Edit'}
              </Text>
            </TouchableOpacity>
            <CustomTextInput
              label="Email"
              value={user?.email}
              editable={false}
            />
            <CustomTextInput
              label="Username"
              value={user?.username}
              editable={false}
            />
            <CustomTextInput
              label="Full Name"
              value={fullname}
              onChangeText={e => setFullname(e)}
              editable={editable || updatingDetails}
            />
          </View>
          <View className="px-4">
            {editable && (
              <CustomButton
                title="Save Changes"
                handlePress={handleChangeAccountDetails}
                isLoading={updatingDetails}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UserDetail;
