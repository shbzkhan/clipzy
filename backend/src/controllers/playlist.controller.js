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
    //TODO: get playlist by id
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
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