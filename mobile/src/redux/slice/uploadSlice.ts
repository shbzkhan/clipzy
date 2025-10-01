// store/loadingSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Upload = {
    isUploading:boolean
     imageUrl:string
     title:string

}

 const initialState:Upload = {
     isUploading:false,
     imageUrl:"",
     title:""
  }

const uploadPostSlice = createSlice({
  name: "uploadingPost",
  initialState,
  reducers: {
    uploadPost: (state, action:PayloadAction<Upload>) => {
      state.isUploading = action.payload.isUploading
      state.imageUrl = action.payload.imageUrl
      state.title = action.payload.title
    },
  },
});

export const { uploadPost } = uploadPostSlice.actions;
export default uploadPostSlice.reducer;
