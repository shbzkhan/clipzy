import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {apiError} from "../utils/ApiError.js"
import {apiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    if(!isValidObjectId(req.user._id)){
        throw new apiError(400, "Invalid User ID")
    }
    const isSubscribed = await Subscription.findOne({
        subscriber:req.user._id,
        channel:channelId
    })
    if(isSubscribed){
        await Subscription.findByIdAndDelete(isSubscribed._id)
        return res
                .status(200)
                .json(
                    new apiResponse(
                        200,
                        {subscribed:false},
                        "Unsubscribed"
                    )
                )
    }

    await Subscription.create({
        subscriber:req.user._id,
        channel:channelId
    })
    return res
            .status(200)
            .json(
               new apiResponse( 
                200,
                {subscribed:true},
                "Subscribed"
                )
            )
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    if(!isValidObjectId(channelId)){
        throw new apiError(400, "Invalid Channel ID")
    }
    const subscribers =  await Subscription.aggregate([
        {
            $match:{
            channel:new mongoose.Types.ObjectId(channelId)
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"subscriber",
                foreignField:"_id",
                as:"subscribers",
                pipeline:[
                    {
                        $lookup:{
                            from:"subscriptions",
                            localField:"_id",
                            foreignField:"channel",
                            as:"subscribedToSbscriber"
                        }
                    },
                    
                    {
                        $addFields:{
                            subscribersCount:{
                               $size:"$subscribedToSbscriber" 
                            },
                            isSubscribed:{
                                $cond:{
                                    if:{$in:[channelId, "$subscribedToSbscriber.subscriber"]},
                                    then:true,
                                    else:false
                                }
                            }
                        }
                    }
                ]

            }
        },
        {
            $unwind:"$subscribers"
        },
        {
            $replaceWith:"$subscribers"
        },
        {
            $project:{
                    fullname:1,
                    avatar:1,
                    username:1,
                    subscribesCount:1,
                    isSubscribed:1
            }
        }
    ])

    if(!subscribers){
        throw new apiError(404, "Subscribers not found")
    }
    
    return res
            .status(200)
            .json(
                new apiResponse(200, subscribers, "Subscribers111111 fetched successfully")
            )
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params
    const subscribedChannels = await Subscription.aggregate([
        {
            $match:{
                subscriber: new mongoose.Types.ObjectId(subscriberId)
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"channel",
                foreignField:"_id",
                as:"subscribedTo",
                pipeline:[
                    {
                        $lookup:{
                            from:"videos",
                            localField:"_id",
                            foreignField:"owner",
                            as:"videos"
                        }
                    },
                    {
                        $addFields:{
                           lastVideo:{
                             $last:"$videos"
                           }
                        }
                    },
                    //yaha project wala karke bhi test karna hai api ko
                ]
            }
        },
        {
            $unwind:"$subscribedTo"
        },
        {
            $replaceWith:"$subscribedTo"
        },
        {
            $project:{
                    _id:1,
                    username:1,
                    fullname:1,
                    avatar:1,
                    lastVideo:{
                        _id:1,
                        thumbnail:1,
                        videoFile:1,
                        owner:1,
                        title:1,
                        description:1,
                        duration:1,
                        createdAt:1,
                        views:1
                    }
                }
            }
        ])

    if(!subscribedChannels){
        throw new apiError(404, "Subscribed Channels not found")
    }

    return res
            .status(200)
            .json(
                new apiResponse(200, subscribedChannels, "Subscribed Channel fetched successfully")
            )
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}