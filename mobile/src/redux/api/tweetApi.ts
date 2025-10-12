import { createApi} from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../middleware/header";
import { CreateTweetsResponse, DeleteTweetsResponse, GetTweetsResponse, UpdateTweetsResponse } from "../../types/tweet.types";


export const tweetApi = createApi({
    reducerPath:"tweet",
    baseQuery:customBaseQuery("tweets/"),
    tagTypes: ["Tweet"],
    endpoints:(builder)=>({
       
        //user tweets
        userTweet :builder.query<GetTweetsResponse, {userId:string}>({
            query:({userId})=> `user/${userId}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags:["Tweet"]
        }),

        //create
        createTweet: builder.mutation<CreateTweetsResponse,{content:string}>({
            query:({content})=> ({
                url:"",
                method:"POST",
                body:{content},
            }),
            invalidatesTags:['Tweet']
        }),
        //update
        updateTweet: builder.mutation<UpdateTweetsResponse,{tweetId:string, content:string}>({
            query:({tweetId, content})=> ({
                url:`${tweetId}`,
                method:"PATCH",
                body:{content},
            }),
            invalidatesTags:['Tweet']
        }),
        //delete
        deleteTweet: builder.mutation<DeleteTweetsResponse,{tweetId:string}>({
            query:({tweetId})=> ({
                url:`${tweetId}`,
                method:"DELETE"
            }),
            invalidatesTags:['Tweet']
        }),


        
    })
})


export const {
    useCreateTweetMutation,
    useUserTweetQuery,
    useUpdateTweetMutation,
    useDeleteTweetMutation
    } = tweetApi