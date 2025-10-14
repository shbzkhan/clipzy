import { createApi } from '@reduxjs/toolkit/query/react';
import {
  AccountDetailsUpdateResponse,
  ApiResponse,
  AvatarUpdateResponse,
  ChangePasswordResponse,
  CoverImageUpdateResponse,
  CurrentUserResponse,
  LoginUser,
  LoginUserResponse,
  RegisterUser,
  RegisterUserResponse,
  UserData,
} from '../../types/auth.types';
import customBaseQuery from '../middleware/header';
import { WatchHistory } from '../../types/video.types';

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: customBaseQuery('users/'),
  endpoints: builder => ({
    //register new user
    register: builder.mutation<RegisterUserResponse, RegisterUser>({
      query: newUser => ({
        url: 'register',
        method: 'POST',
        body: newUser,
      }),
    }),

    // login user api
    login: builder.mutation<LoginUserResponse, LoginUser>({
      query: user => ({
        url: 'login',
        method: 'POST',
        body: user,
      }),
    }),
    googleLogin: builder.mutation<LoginUserResponse, { idToken: string, fcmToken:string }>({
      query: ({ idToken, fcmToken }) => ({
        url: 'google-login',
        method: 'POST',
        body: { idToken, fcmToken },
      }),
    }),
    refreshAccessToken: builder.mutation<
      ApiResponse<UserData>,
      { refreshToken: string }
    >({
      query: ({ refreshToken }) => ({
        url: 'refresh-token',
        method: 'POST',
        body: { refreshToken },
      }),
    }),
    currentUser: builder.query<CurrentUserResponse, void>({
      query: () => ({
        url: 'current',
        method: 'GET',
      }),
    }),
    avatar: builder.mutation<AvatarUpdateResponse, string>({
      query: formData => ({
        url: 'avatar',
        method: 'PATCH',
        body: formData,
      }),
    }),
    coverImage: builder.mutation<CoverImageUpdateResponse, string>({
      query: formData => ({
        url: 'cover-image',
        method: 'PATCH',
        body: formData,
      }),
    }),

    watchHistory: builder.query<WatchHistory, void>({
      query: () => 'watch-history',
    }),
    channel: builder.query<WatchHistory, { channelId: string }>({
      query: ({ channelId }) => `c/${channelId}`,
    }),

    changePassword: builder.mutation<
      ChangePasswordResponse,
      { currentPassword: string; newPassword: string }
    >({
      query: ({ currentPassword, newPassword }) => ({
        url: 'password-change',
        method: 'PATCH',
        body: { currentPassword, newPassword },
      }),
    }),
    changeAccountDetails: builder.mutation<AccountDetailsUpdateResponse, { fullname: string }>({
      query: ({ fullname }) => ({
        url: 'update-account',
        method: 'PATCH',
        body: { fullname },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGoogleLoginMutation,
  useCurrentUserQuery,
  useAvatarMutation,
  useCoverImageMutation,
  useWatchHistoryQuery,
  useChannelQuery,
  useRefreshAccessTokenMutation,
  useChangePasswordMutation,
  useChangeAccountDetailsMutation,
} = authApi;
