import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "../middleware/header";


export const videoApi = createApi({
    reducerPath:"video",
    baseQuery:customBaseQuery,
    endpoints:(builder)=>({
        //register new user
        videoUpload: builder.mutation<any,any>({
            query:(formData)=> ({
                url:"videos",
                method:"POST",
                body:formData,
            })
        }),

    
    })
})


export const {
    useVideoUploadMutation
    } = videoApi