import { createApi} from "@reduxjs/toolkit/query/react";

import customBaseQuery from "../middleware/header";


export const commentApi = createApi({
    reducerPath:"comment",
    baseQuery:customBaseQuery("comment/"),
    tagTypes:["fetchComment"],
    endpoints:(builder)=>({
        //get all comments of video
        videoComments: builder.query<any, {videoId:string, page:string}>({
            query: ({videoId, page}) => `${videoId}?page=${page}&limit=10`,
            transformResponse: (response: { data: any}) => response.data,
            providesTags:["fetchComment"]
        }),



        // add comment on video
        addComment: builder.mutation<any,{videoId:string, content:string}>({
            query:({videoId, content})=> ({
                url:`${videoId}`,
                method:"POST",
                body:{content}
            }),
            invalidatesTags:["fetchComment"],
        }),
    })
})


export const {
    useVideoCommentsQuery,
    useAddCommentMutation
    
    } = commentApi