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
                200,
                {subscribed:true},
                "Subscribed"
            )
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}