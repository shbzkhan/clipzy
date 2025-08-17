import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse, LoginUser, RegisterUser, UserData} from "../../types/auth";

export const authApi = createApi({
    reducerPath:"auth",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://10.77.253.250:4000/api/v1/users/"
    }),
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
        })
    })
})


export const {useRegisterMutation, useLoginMutation} = authApi