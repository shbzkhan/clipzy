import { createApi} from "@reduxjs/toolkit/query/react";

import customBaseQuery from "../middleware/header";


export const connetionApi = createApi({
    reducerPath:"connection",
    baseQuery:customBaseQuery("subscriptions/"),
    endpoints:(builder)=>({
        //toggle connection of channel
        toggleConnetion: builder.mutation<any,string>({
            query:(channelId)=> ({
                url:`c/${channelId}`,
                method:"POST",
            })
        }),

         followingConnetion: builder.query<any, string>({
                    query: (connetionId) => `u/${connetionId}`,
                    transformResponse: (response: { data: any}) => response.data,
            }),
         followersConnetions: builder.query<any, string>({
                    query: (connetionId) => `c/${connetionId}`,
                    transformResponse: (response: { data: any}) => response.data,
        }),

    })
})


export const {
    useToggleConnetionMutation,
    useFollowingConnetionQuery,
    useFollowersConnetionsQuery
    } = connetionApi