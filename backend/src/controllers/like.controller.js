import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {apiError} from "../utils/ApiError.js"
import {apiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    if(!isValidObjectId(videoId)){
        throw new apiError(400, 'Invalid video id')
    }

    const isLike = await Like.findOne({
        likedBy:req.user._id,
        video: videoId
    })

    if(isLike){
        await Like.findByIdAndDelete(isLike._id)

        return res
                .status(200)
                .json(
                    new apiResponse(200, {liked:false}, "Unliked successfully")
                )
    }

    await Like.create({
        likedBy:req.user._id,
        video:videoId
    })

    return res
            .status(201)
            .json(
                new apiResponse(201, {liked:true},"Liked successfully")
            )

})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    //TODO: toggle like on comment

})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}