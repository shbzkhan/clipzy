import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Subscription } from "../models/subscription.model.js";
import { sendNotificationToDevice } from "../utils/sendNotificationToDevice.js";

const createTweet = asyncHandler(async (req, res) => {
  //create tweet
  const { content } = req.body;
  if (!content) {
    throw new ApiError(400, "Content field is required");
  }

  if (!isValidObjectId(req.user._id)) {
    throw new ApiError(401, "Invalid User id");
  }

  const tweet = await Tweet.create({
    content,
    owner: req.user._id,
  });

  if (!tweet) {
    throw new ApiError(404, "Tweet not Published");
  }

  //find all subscriber for send notificaton
  const subscribers = await Subscription.aggregate([
    {
      $match: {
        channel: req.user._id,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "subscriber",
        foreignField: "_id",
        as: "subscriber",
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
        username: 1,
        fcmToken: 1,
      },
    },
    { $match: { fcmToken: { $exists: true, $ne: null } } },
  ]);
  await Promise.all(
    subscribers.map((sub) =>
      sendNotificationToDevice({
        token: sub.fcmToken,
        title: req.user.username,
        body: `New Tweet: ${tweet.content}`,
      })
    )
  );

  return res.status(201).json(new ApiResponse(201, tweet, "Tweet Published"));
});

const getUserTweets = asyncHandler(async (req, res) => {
  // get user tweets
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid userId");
  }

  const tweet = await Tweet.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              fullname: 1,
              username: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "tweet",
        as: "likes",
        pipeline: [
          {
            $project: {
              likedBy: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        likeCount: {
          $size: "$likes",
        },
        owner: {
          $first: "$owner",
        },
        isLiked: {
          $cond: {
            if: { $in: [req.user?._id, "$likes.likedBy"] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $project: {
        content: 1,
        owner: 1,
        likeCount: 1,
        isLiked: 1,
        createdAt: 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, tweet, "Tweets fetched successfully"));
});

const updateTweet = asyncHandler(async (req, res) => {
  //update tweet
  const { content } = req.body;
  const { tweetId } = req.params;

  if (!content) {
    throw new ApiError(400, "Content field is required");
  }

  if (!isValidObjectId(req.user._id)) {
    throw new ApiError(401, "Invalid User id");
  }
  if (!isValidObjectId(tweetId)) {
    throw new ApiError(401, "Invalid Tweet id");
  }

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    throw new ApiError(404, "Tweet not found");
  }

  if (tweet?.owner.toString() !== req.user?._id.toString()) {
    throw new ApiError(400, "only owner can edit thier tweet");
  }

  const updatedTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    {
      $set: {
        content,
      },
    },
    {
      new: true,
    }
  );

  if (!updatedTweet) {
    throw new ApiError(404, "Tweet not update");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, updatedTweet, "Tweet updated successfully"));
});

const deleteTweet = asyncHandler(async (req, res) => {
  //delete tweet
  const { tweetId } = req.params;

  if (!isValidObjectId(req.user._id)) {
    throw new ApiError(401, "Invalid User id");
  }
  if (!isValidObjectId(tweetId)) {
    throw new ApiError(401, "Invalid Tweet id");
  }

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    throw new ApiError(404, "Tweet not found");
  }

  if (tweet?.owner.toString() !== req.user?._id.toString()) {
    throw new ApiError(400, "only owner can delete thier tweet");
  }

  const deletedTweet = await Tweet.findByIdAndDelete(tweetId);

  if (!deletedTweet) {
    throw new ApiError(404, "Tweet not delete");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { tweetId }, "Tweet deleted successfully"));
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
