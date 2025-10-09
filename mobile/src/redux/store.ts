import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from './api/authApi'
import userReducer from "./slice/userSlice"
import themeReducer from "./slice/themeSlice"
import { videoApi } from './api/videoApi'
import { playlistApi } from './api/playlistApi'
import { likeApi } from './api/likeApi'
import { commentApi } from './api/commentApi'
import { connetionApi } from './api/connectionApi'

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    [authApi.reducerPath]: authApi.reducer,
    [videoApi.reducerPath]: videoApi.reducer,
    [playlistApi.reducerPath]: playlistApi.reducer,
    [likeApi.reducerPath]: likeApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [connetionApi.reducerPath]: connetionApi.reducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(authApi.middleware)
  .concat(videoApi.middleware)
  .concat(playlistApi.middleware)
  .concat(likeApi.middleware)
  .concat(commentApi.middleware)
  .concat(connetionApi.middleware)
})

setupListeners(store.dispatch)


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;