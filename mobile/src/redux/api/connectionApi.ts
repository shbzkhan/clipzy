import { createApi} from "@reduxjs/toolkit/query/react";

import customBaseQuery from "../middleware/header";
import { ConnnectonsResponse, GetChannelsFollowingResponse, SubscribeResponse } from "../../types/connnection.types";


export const connetionApi = createApi({
    reducerPath:"connection",
    baseQuery:customBaseQuery("subscriptions/"),
    endpoints:(builder)=>({
        //toggle connection of channel
        toggleConnetion: builder.mutation<SubscribeResponse,string>({
            query:(channelId)=> ({
                url:`c/${channelId}`,
                method:"POST",
            })
        }),

         followingConnetion: builder.query<GetChannelsFollowingResponse, string>({
                    query: (connetionId) => `u/${connetionId}`,
                    transformResponse: (response: { data: any}) => response.data,
            }),
         followersConnetions: builder.query<ConnnectonsResponse[], string>({
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