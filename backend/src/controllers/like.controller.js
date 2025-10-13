import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { sendNotificationToDevice } from "../utils/sendNotificationToDevice.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video id");
  }

  const videoData = await Video.findById(videoId).populate(
    "owner",
    "fullname username fcmToken"
  );
  if (!videoData) {
    throw new ApiError(404, "Video not found");
  }
  const isLike = await Like.findOne({
    likedBy: req.user._id,
    video: videoId,
  });

  if (isLike) {
    await Like.findByIdAndDelete(isLike._id);

    return res
      .status(200)
      .json(new ApiResponse(200, { liked: false }, "Unliked successfully"));
  }

  await Like.create({
    likedBy: req.user._id,
    video: videoId,
  });
  if (videoData.owner._id.toString() !== req.user._id.toString()) {
    if (videoData.owner.fcmToken) {
      await sendNotificationToDevice({
        token: videoData.owner.fcmToken,
        title: req.user.username,
        body: `${req.user.fullname} liked your video,`,
        imageUrl: videoData.thumbnail,
      });
    }
  }
  return res
    .status(201)
    .json(new ApiResponse(201, { liked: true }, "Liked successfully"));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment id");
  }

  const isLikedComment = await Like.findOne({
    likedBy: req.user._id,
    comment: commentId,
  });

  if (isLikedComment) {
    await Like.findByIdAndDelete(isLikedComment._id);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { liked: false },
          "Unliked successfully on comment"
        )
      );
  }

  await Like.create({
    likedBy: req.user._id,
    comment: commentId,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(201, { liked: true }, "Liked successfully on comment")
    );
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet id");
  }

  const isLikedTweet = await Like.findOne({
    likedBy: req.user._id,
    tweet: tweetId,
  });

  if (isLikedTweet) {
    await Like.findByIdAndDelete(isLikedTweet._id);

    return res
      .status(200)
      .json(
        new ApiResponse(200, { liked: false }, "Unliked successfully on tweet")
      );
  }

  await Like.create({
    likedBy: req.user._id,
    tweet: tweetId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, { liked: true }, "Liked successfully on tweet"));
});

const getLikedVideos = asyncHandler(async (req, res) => {
  const likedVideo = await Like.aggregate([
    {
      $match: {
        likedBy: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "videos",
        pipeline: [
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
            $addFields: {
              owner: {
                $first: "$owner",
              },
            },
          },
        ],
      },
    },
    {
      $unwind: "$videos",
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $replaceWith: "$videos",
    },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        videoFile: 1,
        thumbnail: 1,
        views: 1,
        duration: 1,
        createdAt: 1,
        isPublished: 1,
        owner: 1,
      },
    },
  ]);

  if (!likedVideo) {
    throw new ApiError(404, "Liked video not fetch");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, likedVideo, "Liked video fetched successfully"));
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
