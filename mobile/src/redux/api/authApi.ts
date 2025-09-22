import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponse, LoginUser, RegisterUser, UserData} from "../../types/auth";
import customBaseQuery from "../middleware/header";


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
        googleLogin: builder.mutation<ApiResponse<UserData>, LoginUser>({
            query:({idToken})=> ({
                url:"users/google-login",
                method:"POST",
                body:{idToken}
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
    })
})


export const {
    useRegisterMutation,
    useLoginMutation,
    useGoogleLoginMutation,
    useCurrentUserQuery,
    useAvatarMutation,
    useCoverImageMutation
    } = authApi