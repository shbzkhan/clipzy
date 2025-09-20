import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from './api/authApi'
import userReducer from "./slice/userSlice"
import themeReducer from "./slice/themeSlice"
import { videoApi } from './api/videoApi'

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    [authApi.reducerPath]: authApi.reducer,
    [videoApi.reducerPath]: videoApi.reducer
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(authApi.middleware)
  .concat(videoApi.middleware),
})

setupListeners(store.dispatch)


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;