import { createApi} from "@reduxjs/toolkit/query/react";

import customBaseQuery from "../middleware/header";
import { LikedVideoReponse, LikeResponse } from "../../types/like.types";


export const likeApi = createApi({
    reducerPath:"like",
    baseQuery:customBaseQuery("likes/"),
    endpoints:(builder)=>({
        //toggle like of video
        toggleLike: builder.mutation<LikeResponse,string>({
            query:(videoId)=> ({
                url:`toggle/v/${videoId}`,
                method:"POST",
            })
        }),

        // all liked video
        likedVideo: builder.query<LikedVideoReponse, void>({
                    query: () => "videos",
                    transformResponse: (response: { data: any}) => response.data,
    }),

    //toggle like of comment
        toggleCommentLike: builder.mutation<LikeResponse,string>({
            query:(commentId)=> ({
                url:`toggle/c/${commentId}`,
                method:"POST",
            })
        }),

        //toggle like of tweet
        toggleTweetLike: builder.mutation<LikeResponse,string>({
            query:(tweetId)=> ({
                url:`toggle/t/${tweetId}`,
                method:"POST",
            })
        }),
    })
})


export const {
    useToggleLikeMutation,
    useLikedVideoQuery,
    useToggleCommentLikeMutation,
    useToggleTweetLikeMutation
    } = likeApi