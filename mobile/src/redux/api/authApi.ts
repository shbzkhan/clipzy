import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponse, LoginUser, RegisterUser, UserData} from "../../types/auth";
import customBaseQuery from "../middleware/header";
import { WatchHistory } from "../../types/video";


export const authApi = createApi({
    reducerPath:"auth",
    baseQuery:customBaseQuery("users/"),
    endpoints:(builder)=>({
        //register new user
        register: builder.mutation<ApiResponse<UserData>, RegisterUser>({
            query:(newUser)=> ({
                url:"register",
                method:"POST",
                body:newUser
            })
        }),

        // login user api
        login: builder.mutation<ApiResponse<UserData>, LoginUser>({
            query:(user)=> ({
                url:"login",
                method:"POST",
                body:user
            })
        }),
        googleLogin: builder.mutation<ApiResponse<UserData>, {idToken:string}>({
            query:({idToken})=> ({
                url:"google-login",
                method:"POST",
                body:{idToken}
            })
        }),
        refreshAccessToken: builder.mutation<ApiResponse<UserData>, {refreshToken:string}>({
            query:({refreshToken})=> ({
                url:"refresh-token",
                method:"POST",
                body:{refreshToken}
            })
        }),
        currentUser:builder.query({
            query:()=>({
                url:"current",
                method:"GET"
            })
        }),
         avatar: builder.mutation<any,string>({
            query:(formData)=> ({
                url:"avatar",
                method:"PATCH",
                body:formData,
            })
        }),
         coverImage: builder.mutation<any,string>({
            query:(formData)=> ({
                url:"cover-image",
                method:"PATCH",
                body:formData,
            })
        }),

        watchHistory: builder.query<WatchHistory, void>({
                    query: () => "watch-history"
        }),
        channel: builder.query<WatchHistory, {channelId:string}>({
                    query: ({channelId}) => `c/${channelId}`
        }),
    })
})


export const {
    useRegisterMutation,
    useLoginMutation,
    useGoogleLoginMutation,
    useCurrentUserQuery,
    useAvatarMutation,
    useCoverImageMutation,
    useWatchHistoryQuery,
    useChannelQuery,
    useRefreshAccessTokenMutation
    } = authApi