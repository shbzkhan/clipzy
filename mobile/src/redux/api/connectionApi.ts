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

    })
})


export const {
    useToggleConnetionMutation,
    } = connetionApi