import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse, UserData, UserProps } from "../../types/auth";

export const authApi = createApi({
    reducerPath:"auth",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://10.77.253.250:4000/api/v1/users/"
    }),
    endpoints:(builder)=>({
        //register new user
        register: builder.mutation<ApiResponse<UserData>, UserProps>({
            query:(newUser)=> ({
                url:"register",
                method:"POST",
                body:newUser
            })
        })
    })
})


export const {useRegisterMutation} = authApi