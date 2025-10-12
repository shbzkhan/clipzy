import { createApi} from "@reduxjs/toolkit/query/react";

import customBaseQuery from "../middleware/header";
import { AddCommentResponse, DeleteCommentResponse, GetCommentsResponse, UpdateCommentResponse } from "../../types/comment.types";


export const commentApi = createApi({
    reducerPath:"comment",
    baseQuery:customBaseQuery("comment/"),
    tagTypes:["fetchComment"],
    endpoints:(builder)=>({
        //get all comments of video
        videoComments: builder.query<GetCommentsResponse, {videoId:string, page:string}>({
            query: ({videoId, page}) => `${videoId}?page=${page}&limit=10`,
            transformResponse: (response: { data: any}) => response.data,
            providesTags:["fetchComment"]
        }),



        // add comment on video
        addComment: builder.mutation<AddCommentResponse,{videoId:string, content:string}>({
            query:({videoId, content})=> ({
                url:`${videoId}`,
                method:"POST",
                body:{content}
            }),
            invalidatesTags:["fetchComment"],
        }),

        //update comment
        updateComment: builder.mutation<UpdateCommentResponse,{commentId:string, content:string}>({
            query:({commentId, content})=> ({
                url:`/c/${commentId}`,
                method:"PATCH",
                body:{content}
            }),
            invalidatesTags:["fetchComment"],
        }),

        // delete comment
        deleteComment: builder.mutation<DeleteCommentResponse,string>({
            query:(commentId)=> ({
                url:`/c/${commentId}`,
                method:"DELETE"
            }),
            invalidatesTags:["fetchComment"],
        }),
    })
})


export const {
    useVideoCommentsQuery,
    useAddCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation
    
    } = commentApi