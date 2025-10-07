import { createApi} from "@reduxjs/toolkit/query/react";

import customBaseQuery from "../middleware/header";


export const likeApi = createApi({
    reducerPath:"like",
    baseQuery:customBaseQuery("likes/"),
    endpoints:(builder)=>({
        //toggle like of video
        toggleLike: builder.mutation<any,string>({
            query:(videoId)=> ({
                url:`toggle/v/${videoId}`,
                method:"POST",
            })
        }),

        // all liked video
        likedVideo: builder.query<any, void>({
                    query: () => "videos",
                    transformResponse: (response: { data: any}) => response.data,
                 }),
        

    })
})


export const {
    useToggleLikeMutation,
    useLikedVideoQuery
    } = likeApi