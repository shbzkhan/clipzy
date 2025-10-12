import { Text, TouchableOpacity, Pressable, View } from 'react-native';
import React, { FC, useState } from 'react';
import UserLogo from './UserLogo';
import SubscribedButton from './SubscribedButton';
import { navigate } from '../navigation/NavigationUtils';
import { useToggleConnetionMutation } from '../redux/api/connectionApi';
import { ToastShow } from '../utils/Tost';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export interface ChannelUser {
  item:{
  _id: string;
  username: string;
  fullname?: string;
  avatar: string;
  isSubscribed: boolean;
  subscribersCount?: number;
}
}

const ChannelBox:FC<ChannelUser> = ({ item }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [isConnected, setIsConnected] = useState(item.isSubscribed);
  const [toggleConnetion] = useToggleConnetionMutation();

  const isConnetionHandle = async () => {
    try {
      if (isConnected) {
        setIsConnected(false);
      } else {
        setIsConnected(true);
      }
      const toggledConnection = await toggleConnetion(item._id).unwrap();
      setIsConnected(toggledConnection.data.subscribed);
    } catch (error) {
      setIsConnected(false);
      ToastShow(error.data.message);
    }
  };
  return (
    <Pressable
      className="flex-row items-center justify-between"
      onPress={() =>
        navigate('Channel', {
          channelId: item.username,
        })
      }
    >
      <View className="flex-row items-center gap-2">
        <UserLogo
          uri={item.avatar}
          handlePress={() =>
            navigate('Channel', {
              channelId: item.username,
            })
          }
        />
        <Text className="font-rubik-medium dark:text-white">
          {item.username}
        </Text>
        {/* <Text className="text-sm text-gray-500 font-rubik dark:text-gray-300">
                    {data?.data.owner.subscribersCount}
                  </Text> */}
      </View>
      {item._id !== user._id && (
        <SubscribedButton
          handlePress={isConnetionHandle}
          isConnected={isConnected}
        />
      )}
    </Pressable>
  );
};

export default ChannelBox;
