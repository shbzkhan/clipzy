import { createApi} from "@reduxjs/toolkit/query/react";

import customBaseQuery from "../middleware/header";
import { formDataProps } from "../../components/playlist/PlaylistUploader";
import { PlaylistProps } from "../../types/playlist";


export const playlistApi = createApi({
    reducerPath:"playlist",
    baseQuery:customBaseQuery,
    endpoints:(builder)=>({
        //create
        createPlaylist: builder.mutation<PlaylistProps,formDataProps>({
            query:(formData)=> ({
                url:"playlist",
                method:"POST",
                body:formData,
            })
        }),

        //user playlist
        userPlaylist :builder.query<PlaylistProps, {userId:string}>({
            query:({userId})=> `playlist/user/${userId}`
        })
        
    })
})


export const {
    useCreatePlaylistMutation,
    useUserPlaylistQuery
    } = playlistApi