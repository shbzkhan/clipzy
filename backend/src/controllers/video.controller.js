import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import {Video} from "../models/video.model.js"
import {apiError} from "../utils/ApiError.js"
import {apiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {updateOnCloudinary, uploadOnCloudinary, deleteOnCloudinary} from "../utils/cloudinary.js"
import {Like} from "../models/like.model.js"
import { Comment } from "../models/comment.model.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //get all videos based on query, sort, pagination
    const pipeline=[];

    if (query) {
        pipeline.push({
          $search: {
            index: "search-videos",
            autocomplete: {
              query,
              path: "description"
            }
          }
        });
    }

    if(userId){
        if(!isValidObjectId){
            throw new apiError(401, "Inavlid User Id")
        }

        pipeline.push({
            $match:{
                owner: new mongoose.Types.ObjectId(userId)
            }
        })
    }

    pipeline.push({
        $match:{
            isPublished: true
        }
    })


    if(sortBy && sortType){
        pipeline.push({
            $sort:{
                [sortBy]: sortType === "asc"? 1: -1
            }
        })
    }else{
        pipeline.push({
            $sort:{
                createdAt:-1
            }
        })
    }

    pipeline.push({
        $lookup:{
            from:"users",
            localField:"owner",
            foreignField:"_id",
            as: "owner",
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
        $addFields:{
            owner:{
                $first:"$owner"
            }
        }
    }
)
console.dir(pipeline, { depth: null });

    const videoAggregate = Video.aggregate(pipeline)

    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10)
    };

    const video = await Video.aggregatePaginate(videoAggregate, options);

    return res
        .status(200)
        .json(new apiResponse(200, video, "Videos fetched successfully"));

})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
     if ([title, description].some((field) => field?.trim() === "")) {
        throw new apiError(400, "All fields are required");
    }
    const videoFileLocalPath = req.files?.videoFile[0].path
    const thumbnailLocalPath = req.files?.thumbnail[0].path
    if(!videoFileLocalPath || !thumbnailLocalPath){
        throw new apiError(400, "Video and thumbnail are required")
    }

    const videoFile = await uploadOnCloudinary(videoFileLocalPath)
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)
    if(!videoFile){
        throw new apiError(404, "Video not uploaded")
    }
    if(!thumbnail){
        throw new apiError(404, "Thumbnail not uploaded")
    }
    const video = await Video.create({
        videoFile:videoFile.url,
        thumbnail:thumbnail.url,
        title,
        description,
        duration: videoFile.duration,
        owner:req.user._id,
    })

    const videoUploaded = await Video.findById(video._id)
    if(!videoUploaded){
        throw new apiError(404, "Video not published, please try again")
    }

    return res
            .status(200)
            .json(
                new apiResponse(
                    200,
                    videoUploaded,
                    "Video published successfully"
                )
            )

})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if(!isValidObjectId(videoId)){
        throw new apiError(400, "Invalid video id")
    }
    if(!isValidObjectId(req.user._id)){
        throw new apiError(400, "Invalid user id")
    }

    const video = await Video.aggregate([
        {
            $match:{
                _id:  new mongoose.Types.ObjectId(videoId)
            }
        },
        //like pipline
        {
            $lookup:{
                from:"likes",
                localField:"_id",
                foreignField:"video",
                as:"likes"
            }
        },
        //owner find
        {
        $lookup:{
            from:"users",
            localField:"owner",
            foreignField:"_id",
            as: "owner",
            pipeline:[
                // find video owner subscribers
                
                {
                    $lookup:{
                        from:"subscriptions",
                        localField:"_id",
                        foreignField:"channel",
                        as:"subscribers"
                    }
                },
                // add owner subscriber count and channel subscribe or not
                {
                    $addFields:{
                        subscribersCount:{
                            $size:"$subscribers"
                        },
                        isSubscribed:{
                            $cond:{
                            if:{$in:[req.user?._id, "$subscribers.subscriber"]},
                            then:true,
                            else:false
                            }
                        }
                    }
                },
                //owner filed fetched
                {
                    $project:{
                        fullname:1,
                        avatar:1,
                        subscribersCount: 1,
                        isSubscribed: 1
                    }
                }
            ]
        }
        },
        // video extra filed addd
        {
            $addFields:{
                likesCount:{
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
            $project:{
                videoFile:1,
                title:1,
                description:1,
                owner:1,
                likesCount:1,
                isLiked:1,
                views:1,
                duration:1,
                createdAt:1,
                comment:1
            }
        }
    ])
    if(!video){
        throw new apiError(404, "Video fetched failed")
    }
    //increased views
    await Video.findByIdAndUpdate(
        videoId,
        {
            $inc:{
                views:1
            }
        }
    )

    //add view in watch history
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $addToSet:{
                watchHistory:videoId
            }
        }
    )

    return res
            .status(200)
            .json(
                new apiResponse(200, video[0], "Video Fetched successfully")
            )
    
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if(!isValidObjectId(videoId)){
        throw new apiError(400, "Invalid Video Id")
    }
    if(!isValidObjectId(req.user._id)){
        throw new apiError(400, "Invalid User Id")
    }

    //ham user se thumbnail lenge fir usko update karenge
    //ham user se title or description bhi lenge taki in field ko update kar paayen
    //fir ham video owner or user ko match karenge ki sam hai ya koi 3rd party
    //agar user match ho jaata hai to ham phle video ka thumbnail update karenge
    //fir title or body
    //fir ham validate karenge update hua ya nhi
    //res send kar denge
    const {title, description} = req.body;
    if([title || description].some(field=>field?.trim() === "")){
        throw new apiError(400, "All fields are required")
    }

    const video = await Video.findById(videoId)
    if(!video){
        throw new apiError(404, "Video not found")
    }

    if(video.owner.toString() !== req.user._id.toString()){
        throw new apiError(401, "Only video owner can update the video")
    }
    
    const thumbnailLocalPath = req.file?.path
    if(thumbnailLocalPath){
        const publicId = video.thumbnail.split("/").pop().split(".")[0]
        const thumbnail = await updateOnCloudinary(publicId, thumbnailLocalPath)
        if (!thumbnail.url) {
        throw new apiError(400, "thumbnail not update try again")
        }
    }

    video.title = title
    video.description = description

    await video.save()

    return res
            .status(200)
            .json(
                new apiResponse(
                    200, 
                    {},
                    "Video updated successfully"
                )
            )


})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if(!isValidObjectId(videoId)){
        throw new apiError(400, "Invalid Video Id")
    }
    if(!isValidObjectId(req.user._id)){
        throw new apiError(400, "Invalid User Id")
    }
    const video = await Video.findById(videoId)
    if(!video){
        throw new apiError(400, "Video not found")
    }

    if(video.owner.toString() !== req.user._id.toString()){
        throw new apiError(401, "Only video owner can delete the video")
    }

    const videoDelete = await Video.findByIdAndDelete(videoId)
    if(!videoDelete){
        throw new apiError(400, "Failed to delete the video please try again")
    }
//delete videoFile and thumbnail form cloudinary
const publicIdOfVideo = video.videoFile.split("/").pop().split(".")[0]
const publicIdOfThumbnail = video.thumbnail.split("/").pop().split(".")[0]
    await deleteOnCloudinary(publicIdOfVideo, "video")
    await deleteOnCloudinary(publicIdOfThumbnail)
    await Like.deleteMany({video: videoId})
    await Comment.deleteMany({video: videoId})

    return res
        .status(200)
        .json(new apiResponse(200, {}, "Videos deleted successfully"));

})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if(!isValidObjectId(videoId)){
        throw new apiError(400, "Invalid Video Id")
    }
    if(!isValidObjectId(req.user._id)){
        throw new apiError(400, "Invalid User Id")
    }
    const video = await Video.findById(videoId)
    if(!video){
        throw new apiError(400, "Video not found")
    }

    if(video.owner.toString() !== req.user._id.toString()){
        throw new apiError(401, "Only video owner can delete the video")
    }

    const toggledVideo = await Video.findByIdAndUpdate(
        videoId,
        {
            isPublished: !video.isPublished
        },
        {
            new: true
        }
    )
    if(!toggledVideo){
        throw new apiError(404, "Toggle published video failed")
    }

    return res
            .status(200)
            .json(
                new apiResponse(200, toggledVideo.isPublished, "Toggle published successfully")
            )
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}