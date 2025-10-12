import { Video } from "./video.types";

export type ApiResponse<T> = {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
};

type SubscribeResponseData = {
  subscribed: boolean;
};

export type SubscribeResponse = ApiResponse<SubscribeResponseData>;

export type ChannelWithLastVideo = {
  _id: string;
  username: string;
  fullname: string;
  avatar: string;
  lastVideo?: Video;
};

export type GetChannelsFollowingResponse = ApiResponse<ChannelWithLastVideo[]>;

export type ConnnectonsResponse = {
  _id: string;
  username: string;
  fullname: string;
  avatar: string;
  isSubscribed: boolean;
  subscribersCount: number;
};


