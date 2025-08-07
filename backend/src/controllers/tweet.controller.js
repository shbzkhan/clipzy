import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {apiError} from "../utils/ApiError.js"
import {apiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    //create tweet
    const {content} = req.body
    if(!content){
        throw new apiError(400, "Content field is required")
    }

    if(!isValidObjectId(req.user._id)){
        throw new apiError(401,"Invalid User id")
    }

    const tweet = await Tweet.create({
        content,
        owner:req.user._id
    })

    if(!tweet){
        throw new apiError(404, "Tweet not Published")
    }

    return res
            .status(201)
            .json(new apiResponse(201, tweet, "Tweet Published"))

})

const getUserTweets = asyncHandler(async (req, res) => {
    // get user tweets
})

const updateTweet = asyncHandler(async (req, res) => {
    //update tweet
    const {content} = req.body
    const {tweetId} = req.params

    if(!content){
        throw new apiError(400, "Content field is required")
    }

    if(!isValidObjectId(req.user._id)){
        throw new apiError(401,"Invalid User id")
    }
    if(!isValidObjectId(tweetId)){
        throw new apiError(401,"Invalid Tweet id")
    }

    const tweet = await Tweet.findByIdAndUpdate(
        tweetId,
        {
            $set:{
                content
            }
        },
        {
            new: true
        }
    )

    if(!tweet){
        throw new apiError(404, "Tweet not update")
    }

    return res
            .status(201)
            .json(new apiResponse(201, tweet, "Tweet updated successfully"))

})

const deleteTweet = asyncHandler(async (req, res) => {
    //delete tweet
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}