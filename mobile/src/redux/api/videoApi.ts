import { createApi } from '@reduxjs/toolkit/query/react';

import customBaseQuery from '../middleware/header';
import { Video, VideoIdData, VideoResponse, VideoUpdateData, VideoUploadData } from '../../types/video.types.ts';

export const videoApi = createApi({
  reducerPath: 'video',
  baseQuery: customBaseQuery('videos'),
  endpoints: builder => ({
    //getVideos
    getVideos: builder.query<
      VideoResponse,
      { page?: number; userId?: string; search?: string }
    >({
      query: ({ page = 1, userId, search }) =>
        `?page=${page}&limit=10${userId ? `&userId=${userId}` : ''}${
          search ? `&query=${encodeURIComponent(search)}` : ''
        }`,
      transformResponse: (response: { data: VideoResponse }) => response.data,
    }),

    //publised video
    videoUpload: builder.mutation<Video, VideoUploadData>({
      query: formData => ({
        url: '/',
        method: 'POST',
        body: formData,
      }),
    }),

    //getVideoById
    getVideoById: builder.query<VideoIdData, { videoId: string }>({
      query: ({ videoId }) => `/${videoId}`,
    }),

    // delete video
    videoDelete: builder.mutation<Video, string>({
      query: id => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
    videoUpdate: builder.mutation<Video, { video_id: string,formData:VideoUpdateData }>({
      query: ({ video_id, formData }) => ({
        url: `/${video_id}`,
        method: 'PATCH',
        body: formData,
      }),
    }),
  }),
});

export const {
  useVideoUploadMutation,
  useGetVideosQuery,
  useGetVideoByIdQuery,
  useVideoDeleteMutation,
  useVideoUpdateMutation,
} = videoApi;
