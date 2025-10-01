import { createApi} from "@reduxjs/toolkit/query/react";

import customBaseQuery from "../middleware/header";
import { Video, VideoIdData, VideoResponse } from "../../types/video";


export const videoApi = createApi({
    reducerPath:"video",
    baseQuery:customBaseQuery,
    endpoints:(builder)=>({
        //getVideos 
        getVideos: builder.query<VideoResponse, { page?: number, userId?:string}>({
            query: ({ page = 1, userId}) => `videos?page=${page}&limit=10${userId && `&userId=${userId}`}`,
            transformResponse: (response: { data: VideoResponse }) => response.data,
         }),

        //publised video
        videoUpload: builder.mutation<any,any>({
            query:(formData)=> ({
                url:"videos",
                method:"POST",
                body:formData,
            })
        }),
        
        //getVideoById
        getVideoById: builder.query<VideoIdData, {videoId:string}>({
            query: ({videoId}) => `videos/${videoId}`
         }),

         getVideoSearched: builder.query<VideoResponse, { page?: number, query?:string}>({
            query: ({ page = 1, query}) => `videos?page=${page}&limit=10&query=${query}`,
            transformResponse: (response: { data: VideoResponse }) => response.data,
         }),
    })
})


export const {
    useVideoUploadMutation,
    useGetVideosQuery,
    useGetVideoByIdQuery,
    useGetVideoSearchedQuery
    } = videoApi