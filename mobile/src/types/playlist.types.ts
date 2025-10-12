import { Video } from "./video.types";

export type ApiResponse<T> = {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
};

export type Playlist = {
  _id: string;
  name: string;
  description: string;
  videos: Video[];       
  owner?: PlaylistOwner | string; 
  createdAt: string;
  updatedAt: string;
  __v: number;
}



export type PlaylistOwner = {
  _id: string;
  fullname: string;
  avatar: string;
};

export type DeletedPlaylistResponse = {
  statusCode: number;
  message: string;
  success: boolean;
};

export type GetPlaylistsResponse = ApiResponse<Playlist[]>;
export type CreatedPlaylistsResponse = ApiResponse<Playlist>;
export type UpdatedPlaylistsResponse = ApiResponse<Playlist>;
export type GetPlaylistByIdResponse = ApiResponse<Playlist>;
export type AddVideoToPlaylistResponse = ApiResponse<{}>;
export type DeletedVideoToPlaylistResponse = ApiResponse<{}>;
