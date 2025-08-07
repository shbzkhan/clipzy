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
     const { userId } = req.params;

    if (!isValidObjectId(userId)) {
        throw new apiError(400, "Invalid userId");
    }
    
    const tweet = await Tweet.aggregate([
        {
            $match:{
                owner:new mongoose.Types.ObjectId(userId)
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
                            username:1,
                            avatar:1
                        }
                    }
                ]
            }
        },
        {
            $lookup:{
                from:"likes",
                localField:"_id",
                foreignField:"tweet",
                as:"likes",
                pipeline:[
                    {
                    $project:{
                        likedBy:1
                    }
                }
                ]
            }
        },
        {
            $addFields:{
                likeCount:{
                    $size:"$likes"
                },
                owner:{
                    $first:"$owner"
                },
                isLiked:{
                    $cond:{
                        if:{$in:[req.user?._id, "$likes.likedBy"]},
                        then:true,
                        else:false
                    }
                }
            }
        },
        {
            $sort:{
                createdAt:-1
            }
        },
        {
            $project:{
                content:1,
                owner:1,
                likeCount:1,
                isLiked:1,
                createdAt:1
            }
        }
    ])

    return res
        .status(200)
        .json(new apiResponse(200, tweet, "Tweets fetched successfully"));
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

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
        throw new apiError(404, "Tweet not found");
    }

    if (tweet?.owner.toString() !== req.user?._id.toString()) {
        throw new apiError(400, "only owner can edit thier tweet");
    }

    const updatedTweet = await Tweet.findByIdAndUpdate(
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

    if(!updatedTweet){
        throw new apiError(404, "Tweet not update")
    }

    return res
            .status(201)
            .json(new apiResponse(201, updatedTweet, "Tweet updated successfully"))

})

const deleteTweet = asyncHandler(async (req, res) => {
    //delete tweet
    const {tweetId} = req.params

    if(!isValidObjectId(req.user._id)){
        throw new apiError(401,"Invalid User id")
    }
    if(!isValidObjectId(tweetId)){
        throw new apiError(401,"Invalid Tweet id")
    }

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
        throw new apiError(404, "Tweet not found");
    }

    if (tweet?.owner.toString() !== req.user?._id.toString()) {
        throw new apiError(400, "only owner can delete thier tweet");
    }

    const deletedTweet = await Tweet.findByIdAndDelete(tweetId)

    if(!deletedTweet){
        throw new apiError(404, "Tweet not delete")
    }

    return res
            .status(200)
            .json(new apiResponse(200, {tweetId}, "Tweet deleted successfully"))
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}