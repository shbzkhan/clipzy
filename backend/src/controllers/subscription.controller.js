import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendNotificationToDevice } from "../utils/sendNotificationToDevice.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  console.count("toggleSubscription called");
  const { channelId } = req.params;
  if (!isValidObjectId(req.user._id)) {
    throw new ApiError(400, "Invalid User ID");
  }

  const isSubscribed = await Subscription.findOne({
    subscriber: req.user._id,
    channel: channelId,
  });
  if (isSubscribed) {
    await Subscription.findByIdAndDelete(isSubscribed._id);
    return res
      .status(200)
      .json(new ApiResponse(200, { subscribed: false }, "Unsubscribed"));
  }

  await Subscription.create({
    subscriber: req.user._id,
    channel: channelId,
  });

  const subscriber = await User.findById(req.user._id).select(
    "fullname username"
  );
  const channelOwner = await User.findById(channelId).select(
    "fcmToken fullname, username"
  );

  if (channelOwner?.fcmToken) {
    console.count("sendNotificationToDevice called");
    await sendNotificationToDevice({
      token: channelOwner.fcmToken,
      title: subscriber.username,
      body: `${subscriber.fullname} follow to your channel ${channelOwner.username}.`,
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { subscribed: true }, "Subscribed"));
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  let { channelId } = req.params;
  if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid Channel ID");
  }
  channelId = new mongoose.Types.ObjectId(channelId);
  const subscribers = await Subscription.aggregate([
    {
      $match: {
        channel: channelId,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "subscriber",
        foreignField: "_id",
        as: "subscriber",
        pipeline: [
          {
            $lookup: {
              from: "subscriptions",
              localField: "_id",
              foreignField: "channel",
              as: "subscribedToSubscriber",
            },
          },

          {
            $addFields: {
              isSubscribed: {
                $cond: {
                  if: {
                    $in: [channelId, "$subscribedToSubscriber.subscriber"],
                  },
                  then: true,
                  else: false,
                },
              },
              subscribersCount: {
                $size: "$subscribedToSubscriber",
              },
            },
          },
        ],
      },
    },
    {
      $unwind: "$subscriber",
    },
    {
      $replaceWith: "$subscriber",
    },
    {
      $project: {
        _id: 1,
        fullname: 1,
        avatar: 1,
        username: 1,
        subscribersCount: 1,
        isSubscribed: 1,
      },
    },
  ]);

  if (!subscribers) {
    throw new ApiError(404, "Subscribers not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, subscribers, "Subscribers fetched successfully")
    );
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;
  const subscribedChannels = await Subscription.aggregate([
    {
      $match: {
        subscriber: new mongoose.Types.ObjectId(subscriberId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "channel",
        foreignField: "_id",
        as: "subscribedTo",
        pipeline: [
          {
            $lookup: {
              from: "videos",
              localField: "_id",
              foreignField: "owner",
              as: "videos",
            },
          },
          {
            $addFields: {
              lastVideo: {
                $last: "$videos",
              },
            },
          },
          //yaha project wala karke bhi test karna hai api ko
        ],
      },
    },
    {
      $unwind: "$subscribedTo",
    },
    {
      $replaceWith: "$subscribedTo",
    },
    {
      $project: {
        _id: 1,
        username: 1,
        fullname: 1,
        avatar: 1,
        lastVideo: {
          _id: 1,
          thumbnail: 1,
          videoFile: 1,
          owner: 1,
          title: 1,
          description: 1,
          duration: 1,
          createdAt: 1,
          views: 1,
        },
      },
    },
  ]);

  if (!subscribedChannels) {
    throw new ApiError(404, "Subscribed Channels not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        subscribedChannels,
        "Subscribed Channel fetched successfully"
      )
    );
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
