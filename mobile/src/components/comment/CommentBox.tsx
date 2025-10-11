import React, { FC, useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import {
  useAddCommentMutation,
  useUpdateCommentMutation,
} from '../../redux/api/commentApi';
import UserLogo from '../UserLogo';
import CustomIcon from '../CustomIcon';
import { EmojiData } from '../../utils/emojiData';
import { ToastShow } from '../../utils/Tost';
import { RootState } from '../../redux/store';

interface commentBoxProps {
  videoId: string;
  update: boolean;
  setUpdate: any;
  setEdit: any;
  updateData: {
    id: string;
    content: string;
  };
}
const CommentBox: FC<commentBoxProps> = ({
  videoId,
  update,
  updateData,
  setUpdate,
  setEdit,
}) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [comment, setComment] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (update) {
      setEdit(false);
      setComment(updateData.content);
      console.log('commentId', updateData.id);
    } else {
      setComment('');
    }
  }, [update]);

  const handleEmojiClick = (emoji: string) => {
    setComment(prevComment => prevComment + emoji);
  };

  const [addComment, { isLoading }] = useAddCommentMutation();
  const [updateComment, { isLoading: updateCommentLoading }] =
    useUpdateCommentMutation();

  const handleAddComment = async () => {
    try {
      const commented = await addComment({
        videoId,
        content: comment,
      }).unwrap();
      console.log('commented', commented);
      ToastShow(commented.message);
      setComment('');
    } catch (error) {
      console.log('Error ', error);
      ToastShow(error.data.message);
    }
  };
  const handleUpdateComment = async () => {
    try {
      setEdit(false);
      const commentUpdated = await updateComment({
        commentId: updateData.id,
        content: comment,
      }).unwrap();
      console.log('commented', commentUpdated);
      ToastShow(commentUpdated.message);
      setComment('');
      setUpdate(false);
    } catch (error) {
      console.log('Error ', error);
      ToastShow(error.data.message);
    }
  };
  return (
    <View
      className={`bg-dark border-t border-gray-500 w-full px-4 py-2 gap-2 ${
        isFocused && 'pb-14'
      }`}
    >
      <View className="flex-row gap-2 ">
        <UserLogo uri={user?.avatar} heightAndWidth={9} />
        <TextInput
          className="flex-1 px-4 text-white rounded-lg bg-dark-100 font-rubik min-h-11"
          value={comment}
          multiline
          placeholder="Write Comment"
          placeholderTextColor="#9E9E9E"
          textAlignVertical="center"
          onChangeText={text => setComment(text)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {!update
          ? comment.trim() !== '' && (
              <CustomIcon
                name={!isLoading ? 'Send' : 'Loader'}
                className="bg-primary-600"
                color="white"
                handlePress={handleAddComment}
                disabled={isLoading}
              />
            )
          : comment.trim() !== '' && (
              <CustomIcon
                name={!updateCommentLoading ? 'SquarePen' : 'Loader'}
                className="bg-primary-600"
                color="white"
                handlePress={handleUpdateComment}
                disabled={updateCommentLoading}
              />
            )}
      </View>
      {isFocused && (
        <View className="flex-row justify-between px-4">
          {EmojiData?.map((i: string, index: number) => (
            <TouchableOpacity key={index} onPress={() => handleEmojiClick(i)}>
              <Text className="text-2xl">{i}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default CommentBox;
