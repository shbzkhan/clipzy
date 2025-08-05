import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {apiError} from "../utils/ApiError.js"
import {apiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body
    if(!name || !description){
        throw new apiError(400, "All fields are required")
    }

    const playlist = await Playlist.create({
        name,
        description,
        owner:req.user._id
    })
    
    if(!playlist){
        throw new apiError(404, "Playlist not created")
    }
    
    return res
            .status(201)
            .json(new apiResponse(201,playlist, "Playlist created successfully"))
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    if(!userId){
        throw new apiError(404, "User Id required")
    }
    if(!isValidObjectId(userId)){
        throw new apiError(404, "Invalid User Id")
    }

    const playlist = await Playlist.find({owner:userId})

    return res
            .status(200)
            .json(new apiResponse(200, playlist, "Playlist fetched"))

})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params

    if(!playlistId){
        throw new apiError(404, "Playlist Id required")
    }
    if(!isValidObjectId(playlistId)){
        throw new apiError(404, "Invalid Playlist Id")
    }

    const playlist = await Playlist.findById(playlistId)
        if(!playlist){
            throw new apiError(404, "Playlist not found")
        }

    return res
            .status(200)
            .json(new apiResponse(200, playlist, "Playlist fetched"))
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    if(!playlistId || !videoId){
        throw new apiError(404, "Playlist and Video Id required")
    }
    if(!isValidObjectId(playlistId)){
        throw new apiError(404, "Invalid Playlist Id")
    }
    if(!isValidObjectId(videoId)){
        throw new apiError(404, "Invalid Video Id")
    }

    const playlist = await Playlist.findById(playlistId)

        if(!playlist){
            throw new apiError(404, "Playlist not found")
        }

    if(playlist.owner.toString() !== req.user._id){
        throw new apiError(401, "Only playlist owner can add videos")
    }

    if(playlist.videos.includes(new mongoose.Types.ObjectId(videoId))){
        throw new apiError(400, "Video already added in this playlist")
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
                    playlistId,
                    {
                      $addToSet:{
                        videos:videoId
                      }  
                    },
                    {
                        new:true
                    }
    )
    if(!updatedPlaylist){
        throw new apiError("Video not add in playlist")
    }

    return res
            .status(200)
            .json(new apiResponse(200, updatePlaylist, "Playlist fetched"))
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: remove video from playlist

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    // TODO: delete playlist
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    //TODO: update playlist
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}