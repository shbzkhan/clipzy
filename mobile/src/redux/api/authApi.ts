import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponse, LoginUser, RegisterUser, UserData} from "../../types/auth";
import customBaseQuery from "../middleware/header";
import { WatchHistory } from "../../types/video";


export const authApi = createApi({
    reducerPath:"auth",
    baseQuery:customBaseQuery,
    endpoints:(builder)=>({
        //register new user
        register: builder.mutation<ApiResponse<UserData>, RegisterUser>({
            query:(newUser)=> ({
                url:"users/register",
                method:"POST",
                body:newUser
            })
        }),

        // login user api
        login: builder.mutation<ApiResponse<UserData>, LoginUser>({
            query:(user)=> ({
                url:"users/login",
                method:"POST",
                body:user
            })
        }),
        googleLogin: builder.mutation<ApiResponse<UserData>, {idToken:string}>({
            query:({idToken})=> ({
                url:"users/google-login",
                method:"POST",
                body:{idToken}
            })
        }),
        refreshAccessToken: builder.mutation<ApiResponse<UserData>, {refreshToken:string}>({
            query:({refreshToken})=> ({
                url:"users/refresh-token",
                method:"POST",
                body:{refreshToken}
            })
        }),
        currentUser:builder.query({
            query:()=>({
                url:"users/current",
                method:"GET"
            })
        }),
         avatar: builder.mutation<any,string>({
            query:(formData)=> ({
                url:"users/avatar",
                method:"PATCH",
                body:formData,
            })
        }),
         coverImage: builder.mutation<any,string>({
            query:(formData)=> ({
                url:"users/cover-image",
                method:"PATCH",
                body:formData,
            })
        }),

        watchHistory: builder.query<WatchHistory, void>({
                    query: () => "users/watch-history"
        }),
        channel: builder.query<WatchHistory, {channelId:string}>({
                    query: ({channelId}) => `users/c/${channelId}`
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