import React, { FC, useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from '../../constants/Icons';
import { timeAgo } from '../../constants/TimeAgo';
import { useDeleteCommentMutation } from '../../redux/api/commentApi';
import { useToggleCommentLikeMutation } from '../../redux/api/likeApi';
import { RootState } from '../../redux/store';
import { handleShareToSocialMedia } from '../../utils/ShareToSocialMedia';
import { ToastShow } from '../../utils/Tost';
import UserLogo from '../UserLogo';

type Owner = {
  _id: string;
  username: string;
  avatar: string;
};

type CommentItem = {
  _id: string;
  owner: Owner;
  content: string;
  likes: number;
  isLike: boolean;
  createdAt: string;
};

type EditData = {
  id: string;
  content: string;
};

type CommentCardProps = {
  item: CommentItem;
  edit: boolean;
  setEdit: (value: boolean) => void;
  update: boolean;
  setUpdate: (value: boolean) => void;
  editData: EditData;
  setEditData: (data: EditData) => void;
};

const CommentCard: FC<CommentCardProps> = ({
  item,
  edit,
  setEdit,
  update,
  setUpdate,
  editData,
  setEditData,
}) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [like, setLike] = useState(item.likes);
  const [isLiked, setIsLiked] = useState(item.isLike);
  const [deleteComment, { isLoading: deletingComment }] =
    useDeleteCommentMutation();
  const [toggleCommentLike] = useToggleCommentLikeMutation();

  //delete comment handler
  const handleDeleteComment = async () => {
    setUpdate(false);
    setEdit(false);
    try {
      const deletedComment = await deleteComment(item._id).unwrap();
      ToastShow(deletedComment.message);
      setEditData({
        id: '',
        content: '',
      });
    } catch (error) {
      ToastShow(error?.data.message, 'danger');
    }
  };

  //comment likes handler
  const isLikedHandle = async () => {
    try {
      if (isLiked) {
        setLike(like - 1);
        setIsLiked(false);
      } else {
        setLike(like + 1);
        setIsLiked(true);
      }
      const toggledCommentLike = await toggleCommentLike(item._id).unwrap();
      setIsLiked(toggledCommentLike.data.liked);
    } catch (error) {
      setIsLiked(false);
      setLike(like - 1);
      ToastShow(error.data.message);
    }
  };
  return (
    <>
      <Pressable
        className="flex-row gap-3"
        onPress={() => {
          setUpdate(false);
          setEdit(false);
          setEditData({ id: '', content: '' });
        }}
      >
        <UserLogo uri={item.owner.avatar} heightAndWidth={8} />

        <View className="flex-1 gap-1">
          <Text className="text-xs text-gray-300 font-rubik">
            @{item.owner.username} • {timeAgo(item.createdAt)}
          </Text>

          <Text className="text-white font-rubik">{item.content}</Text>

          <View className="flex-row gap-5">
            <TouchableOpacity
              className="flex-row gap-1"
              onPress={isLikedHandle}
            >
              <Icon name="Heart" size={17} focused={isLiked} />
              <Text className="text-sm text-white font-rubik">{like}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center gap-1"
              onPress={() =>
                handleShareToSocialMedia({
                  message: item.content,
                  url_id: item.owner._id,
                })
              }
            >
              <Icon name="Send" size={16} />
              <Text className="text-sm text-white font-rubik">Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          disabled={deletingComment || user._id !== item.owner._id}
          onPress={() => {
            setEdit(true);
            setEditData({ id: item._id, content: item.content });
          }}
        >
          <Icon
            name={
              !deletingComment
                ? 'EllipsisVertical'
                : editData.id === item._id
                ? 'Loader'
                : 'EllipsisVertical'
            }
            color="white"
            size={18}
          />
        </TouchableOpacity>
      </Pressable>

      {edit && item._id === editData.id && (
        <View className="absolute justify-center gap-4 px-3 py-3 rounded-md right-5 top-2 bg-dark-100">
          <TouchableOpacity
            className="flex-row items-center gap-1"
            onPress={() => setUpdate(!update)}
          >
            <Icon name="Pencil" size={15} />
            <Text className="text-white font-rubik-bold">Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center gap-1"
            onPress={handleDeleteComment}
          >
            <Icon name="Trash2" size={15} />
            <Text className="text-sm text-danger font-rubik-bold">Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default CommentCard;
