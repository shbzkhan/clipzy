import { createApi} from "@reduxjs/toolkit/query/react";

import customBaseQuery from "../middleware/header";
import { Video, VideoIdData, VideoResponse } from "../../types/video";


export const videoApi = createApi({
    reducerPath:"video",
    baseQuery:customBaseQuery("videos"),
    endpoints:(builder)=>({
        //getVideos 
        getVideos: builder.query<VideoResponse, { page?: number, userId?:string, search?:string}>({
            query: ({ page = 1, userId, search}) => `?page=${page}&limit=10${userId ? `&userId=${userId}`:""}${search ? `&query=${encodeURIComponent(search)}`:""}`,
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

        // delete video
        videoDelete: builder.mutation<any,string>({
            query:(id)=> ({
                url:`/${id}`,
                method:"DELETE",
            })
        }),


    })
})


export const {
    useVideoUploadMutation,
    useGetVideosQuery,
    useGetVideoByIdQuery,
    useVideoDeleteMutation
    } = videoApi