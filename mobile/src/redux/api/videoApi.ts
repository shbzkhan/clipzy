import { createApi} from "@reduxjs/toolkit/query/react";

import customBaseQuery from "../middleware/header";
import { Video, VideoIdData, VideoResponse } from "../../types/video";


export const videoApi = createApi({
    reducerPath:"video",
    baseQuery:customBaseQuery("videos"),
    endpoints:(builder)=>({
        //getVideos 
        getVideos: builder.query<VideoResponse, { page?: number, userId?:string}>({
            query: ({ page = 1, userId}) => `?page=${page}&limit=4${userId && `&userId=${userId}`}`,
            transformResponse: (response: { data: VideoResponse }) => response.data,
         }),

        //publised video
        videoUpload: builder.mutation<any,any>({
            query:(formData)=> ({
                url:"/",
                method:"POST",
                body:formData,
            })
        }),
        
        //getVideoById
        getVideoById: builder.query<VideoIdData, {videoId:string}>({
            query: ({videoId}) => `/${videoId}`
         }),

         getVideoSearched: builder.query<VideoResponse, { page?: number, query?:string}>({
            query: ({ page = 1, query}) => `?page=${page}&limit=10&query=${query}`,
            transformResponse: (response: { data: VideoResponse }) => response.data,
         }),

    })
})


export const {
    useVideoUploadMutation,
    useGetVideosQuery,
    useGetVideoByIdQuery,
    useGetVideoSearchedQuery,
    } = videoApi