// src/types.ts

export interface Owner {
  _id: string;
  username: string;
  fullname: string;
  avatar: string;
  subscribersCount: number;
  isSubscribed: boolean;
}

export interface Video {
  _id: string;
  videoFile: string;
  thumbnail: string;
  title: string;
  description: string;
  z: string;
  views: number;
  owner: Owner;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface VideoResponse {
  docs: Video[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}


export interface VideoById extends Video {
    likesCount: number;
    isLiked: boolean;
}

export interface VideoIdData {
  statusCode: number;
  data: VideoById;
}

export interface WatchHistory{
  statusCode: number;
  data: (Video | null)[];
  message: string;
  success: boolean;
}