import { formDataProps } from './../../components/playlist/PlaylistUploader';
import { createApi} from "@reduxjs/toolkit/query/react";

import customBaseQuery from "../middleware/header";
import { PlaylistProps, PlaylistResponse } from "../../types/playlist";


export const playlistApi = createApi({
    reducerPath:"playlist",
    baseQuery:customBaseQuery("playlist/"),
    tagTypes: ["PlaylistFetch","videoDeleteFromPlaylist"],
    endpoints:(builder)=>({
       
        //user playlist
        userPlaylist :builder.query<PlaylistProps, {userId:string}>({
            query:({userId})=> `user/${userId}`,
            providesTags:["PlaylistFetch"]
        }),

        //create
        createPlaylist: builder.mutation<PlaylistProps,formDataProps>({
            query:(formData)=> ({
                url:"",
                method:"POST",
                body:formData,
            }),
            invalidatesTags:['PlaylistFetch']
        }),

        //update playlist
        updatePlaylist: builder.mutation<PlaylistProps,{id:string | null, formData:formDataProps}>({
            query:({id, formData})=> ({
                url:`${id}`,
                method:"PATCH",
                body:formData,
            }),
            invalidatesTags:['PlaylistFetch']
        }),

        //delet playlist
        deletePlaylist: builder.mutation<PlaylistProps,{id:string | null}>({
            query:(id)=> ({
                url:`${id}`,
                method:"DELETE",
            }),
            invalidatesTags:['PlaylistFetch']
        }),

        //playlist by id
        playlistById :builder.query<PlaylistProps, {playlistId:string}>({
            query:({playlistId})=> `${playlistId}`,
            providesTags:['videoDeleteFromPlaylist']
        }),

        // video of playlist
        playlistAddVideo: builder.mutation<PlaylistResponse,{videoId:string, playlistId:string}>({
            query:({videoId, playlistId})=> ({
                url:`add/${videoId}/${playlistId}`,
                method:"PATCH",
            }),
        }),
        playlistDeleteVideo: builder.mutation<PlaylistResponse,{videoId:string, playlistId:string}>({
            query:({videoId, playlistId})=> ({
                url:`remove/${videoId}/${playlistId}`,
                method:"PATCH",
            }),
            invalidatesTags:["videoDeleteFromPlaylist"]
        }),
        
    })
})


export const {
    useCreatePlaylistMutation,
    useUserPlaylistQuery,
    useUpdatePlaylistMutation,
    useDeletePlaylistMutation,
    usePlaylistByIdQuery,
    usePlaylistAddVideoMutation,
    usePlaylistDeleteVideoMutation
    } = playlistApi