import { ApiResponse } from './auth.types';
export interface LoginUser {
    email:string
    password:string
}
export interface RegisterUser extends LoginUser {
    fullname:string
    username:string
    
}

export interface UserData extends RegisterUser {
  _id: string
  avatar: string
  coverImage: string
  watchHistory: string[]    
  createdAt: string          
  updatedAt: string
  __v: number
}

export interface ApiResponse<T> {
  statusCode: number
  data: T
  message: string
  success: boolean
}

export type RegisterUserResponse = ApiResponse<UserData>
export type LoginUserResponse = ApiResponse<UserData>
export type AvatarUpdateResponse = ApiResponse<{}>
export type CoverImageUpdateResponse = ApiResponse<{}>
export type AccountDetailsUpdateResponse = ApiResponse<UserData>
export type CurrentUserResponse = ApiResponse<UserData>
export type ChangePasswordResponse = ApiResponse<{}>
