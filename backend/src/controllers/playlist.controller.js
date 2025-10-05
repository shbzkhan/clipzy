import mongoose, { isValidObjectId } from "mongoose"
import { Playlist } from "../models/playlist.model.js"
import { apiError } from "../utils/ApiError.js"
import { apiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


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

    const playlist = await Playlist.find({owner:userId}).sort({updatedAt: -1})

    return res
            .status(200)
            .json(new apiResponse(200, playlist, "Playlist fetched"))

})


const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params

    if(!isValidObjectId(playlistId)){
        throw new apiError(404, "Invalid Playlist Id")
    }
    const userPlaylist = await Playlist.aggregate([
        {
            $match:{
                _id: new mongoose.Types.ObjectId(playlistId)
            }
        },
        {
            $lookup:{
                from:"videos",
                localField:"videos",
                foreignField:"_id",
                as:"videoss",
                pipeline:[
                    {
                        $lookup:{
                            from:"users",
                            localField:"owner",
                            foreignField:"_id",
                            as:"owner",
                            pipeline:[
                                {
                                    $project:{
                                        _id:1,
                                        fullname:1,
                                        avatar:1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields:{
                            owner:{
                                $first:"$owner"
                            }
                        }
                    }
                ]
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"owner",
                foreignField:"_id",
                as:"owner",
                pipeline:[
                    {
                        $project:{
                            fullname:1,
                            avatar:1
                        }
                    }
                ]
            }
        },
        {
            $addFields:{
                owner:{
                    $first:"$owner"
                },
                videos:{
                    $map:{
                        input:{ $reverseArray: "$videos" },
                        as:"id",
                        in:{
                            $first:{
                                $filter:{
                                    input:"$videoss",
                                    as:"video",
                                     cond: { $eq: ["$$video._id", "$$id"] }
                                }
                            }
                        }
                    }
                }
            }
        },{
             $project: {
                    videoss: 0
                }
        }
    ])

    if(!userPlaylist){
            throw new apiError(404, "User Playlist not fetch")
        }

    return res
            .status(200)
            .json(new apiResponse(200, userPlaylist[0], "Playlist fetched"))
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

    if(playlist.owner.toString() !== req.user._id.toString()){
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
            .json(new apiResponse(200, {}, "Video add in playlist"))
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
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

    if(playlist.owner.toString() !== req.user._id.toString()){
        throw new apiError(401, "Only playlist owner can remove videos")
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
                    playlistId,
                    {
                      $pull:{
                        videos:videoId
                      }  
                    },
                    {
                        new:true
                    }
    )
    if(!updatedPlaylist){
        throw new apiError("Video not remove from playlist")
    }

    return res
            .status(200)
            .json(new apiResponse(200, {}, "Video remove from playlist"))

})

const deletePlaylist = asyncHandler(async (req, res) => {
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

    if(playlist.owner.toString() !== req.user._id.toString()){
        throw new apiError(401, "Only playlist owner can delete playlist")
    }

    const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId)
    if(!deletedPlaylist){
        throw new apiError("Playlist not delete")
    }

    return res
            .status(200)
            .json(new apiResponse(200, deletePlaylist, "Playlist deleted successfully"))
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body

    if(!name || !description){
        throw new apiError(400, "All fields are required")
    }
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

    if(playlist.owner.toString() !== req.user._id.toString()){
        throw new apiError(401, "Only playlist owner can delete playlist")
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $set:{
                name,
                description
            }
        },
        {
            new: true
        }
    ).select("-videos")

    if(!updatedPlaylist){
        throw new apiError("Playlist not update")
    }

    return res
            .status(200)
            .json(new apiResponse(200, updatedPlaylist, "Playlist updated successfully"))
})

export {
    addVideoToPlaylist, createPlaylist, deletePlaylist, getPlaylistById, getUserPlaylists, removeVideoFromPlaylist, updatePlaylist
}

