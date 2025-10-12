import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from '../../constants/Icons';
import { launchCamera } from 'react-native-image-picker';
import { createThumbnail } from 'react-native-create-thumbnail';
import { navigate } from '../../navigation/NavigationUtils';

const PickerVideoButton = () => {
  const handleCamera = async () => {
    await launchCamera({
      saveToPhotos: false,
      formatAsMp4: true,
      mediaType: 'video',
      includeExtra: true,
    })
      .then(res => {
        createThumbnail({
          url: res.assets![0].uri || '',
          timeStamp: 100,
        })
          .then(response => {
            if (res.assets![0].uri) {
              //Upload Video Screen
              navigate('UploadScreen', {
                thumb_uri: response.path,
                file_uri: res.assets![0].uri,
              });
            }
          })
          .catch(err => {
            console.log('Error', err);
          });
      })
      .catch(err => {
        console.log('video Record', err);
      });
  };

  return (
    <View className="flex-row items-center justify-between mt-5">
      <TouchableOpacity
        onPress={handleCamera}
        className="items-center justify-center gap-1 p-3 w-[30%] h-24 bg-secondary dark:bg-dark-100 rounded-lg"
      >
        <Icon name="Camera" />
        <Text className="dark:text-white font-rubik-medium">Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity className="items-center justify-center gap-1 p-3 w-[30%] h-24 bg-secondary dark:bg-dark-100 rounded-lg">
        <Icon name="Library" />
        <Text className="dark:text-white font-rubik-medium">Drafts</Text>
      </TouchableOpacity>
      <TouchableOpacity className="items-center justify-center gap-1 p-3 w-[30%] h-24 bg-secondary dark:bg-dark-100 rounded-lg">
        <Icon name="WandSparkles" />
        <Text className="dark:text-white font-rubik-medium">Templates</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PickerVideoButton;
