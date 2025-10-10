import React, { FC, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from '../../constants/Icons';
import {
  useCreateTweetMutation,
  useDeleteTweetMutation,
  useUpdateTweetMutation
} from '../../redux/api/tweetApi';
import { RootState } from '../../redux/store';
import { ToastLoading, ToastShow } from '../../utils/Tost';
import UserLogo from '../UserLogo';
interface TweetProps {
  item: {
    _id: string;
    content: string;
    isLiked: boolean;
    likeCount: number;
    owner: {
      _id: string;
      username: string;
      avatar: string;
    };
  };
  tweetCreator?: boolean | false;
  setIsCreateTweet?: any;
}
const TweetCard: FC<TweetProps> = ({
  item,
  tweetCreator,
  setIsCreateTweet,
}) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [content, setContent] = useState(tweetCreator ? '' : item.content);
  const [updateContent, setUpdateContent] = useState(false);
  const [createTweet] = useCreateTweetMutation();
  const [updateTweet, { isLoading }] = useUpdateTweetMutation();
  const [deleteTweet, { isLoading: isDeleting }] = useDeleteTweetMutation();

  //create tweet handler
  const handleCreateTweet = async () => {
    const toastId = ToastLoading('Tweet uploading...');
    setContent('');
    try {
      setIsCreateTweet(false);
      const uploadedTweet = await createTweet({ content }).unwrap();
      ToastShow(uploadedTweet.message, 'success', toastId);
    } catch (error) {
      ToastShow('Tweet not post', 'danger', toastId);
    }
  };
  const handleUpdateTweet = async () => {
    const toastId = ToastLoading('Tweet updating...');
    setUpdateContent(false);
    try {
      const updatedTweet = await updateTweet({
        tweetId: item._id,
        content,
      }).unwrap();
      ToastShow(updatedTweet.message, 'success', toastId);
    } catch (error) {
      ToastShow('Tweet not update', 'danger', toastId);
    }
  };
  const handleDeleteTweet = async () => {
    const toastId = ToastLoading('Tweet deleting...');
    try {
      const deletedTweet = await deleteTweet({ tweetId: item._id }).unwrap();
      ToastShow(deletedTweet.message, 'success', toastId);
    } catch (error) {
      ToastShow('Tweet not delete', 'danger', toastId);
    }
  };

  return (
    <View className="gap-2">
      <View className="flex-row justify-between items-center gap-2 px-4">
        <View className="flex-row items-center gap-2">
          <UserLogo
            uri={!tweetCreator ? item.owner.avatar : user?.avatar}
            //handlePress={()}
            heightAndWidth={9}
          />
          <Text className="text-sm text-gray-600 font-rubik-bold dark:text-gray-300">
            {!tweetCreator ? item.owner.username : user?.username}
          </Text>
        </View>
        {!tweetCreator && user?._id === item.owner._id && (
          <View className="flex-row gap-5">
            <TouchableOpacity
              disabled={isLoading}
              onPress={() => setUpdateContent(!updateContent)}
            >
              <Text className="text-primary-600 font-rubik-medium">
                {updateContent ? 'Cancel' : 'Update'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={isDeleting} onPress={handleDeleteTweet}>
              <Text className="text-danger font-rubik-medium">Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View className="p-3 border-2 rounded-md border-secondary dark:border-dark-100 min-h-32">
        <TextInput
          className="text-lg font-rubik dark:text-white min-h-32 align-top"
          multiline
          returnKeyType="send"
          // onSubmitEditing={}
          editable={tweetCreator || updateContent}
          onChangeText={e => setContent(e)}
          placeholder="Write your content"
        >
          {content}
        </TextInput>
      </View>
      <View className="absolute p-3 bg-white border rounded-full -bottom-6 right-3 border-secondary dark:bg-dark dark:border-dark-100">
        {tweetCreator ? (
          <TouchableOpacity onPress={handleCreateTweet}>
            <Icon name="Send" color="#60A5FA" size={20} />
          </TouchableOpacity>
        ) : updateContent ? (
          <TouchableOpacity onPress={handleUpdateTweet}>
            <Icon name="SquarePen" color="#60A5FA" size={20} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Icon name="Heart" color="#60A5FA" size={20} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TweetCard;
