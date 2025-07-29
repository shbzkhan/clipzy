import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import {Video} from "../models/video.model.js"
import {apiError} from "../utils/ApiError.js"
import {apiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadToCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
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

    const videoFile = await uploadToCloudinary(videoFileLocalPath)
    const thumbnail = await uploadToCloudinary(thumbnailLocalPath)
    if(!videoFile){
        throw new apiError(404, "Video not uploaded")
    }
    if(!thumbnail){
        throw new apiError(404, "Thumbnail not uploaded")
    }

    const user = await Video.create({
        videoFile:videoFile.url,
        thumbnail:thumbnail.url,
        title,
        description,
        duration: videoFile.duration,
        owner:req.user._id,
    })

    const videoUploaded = Video.findById(user._id)
    if(!videoUploaded){
        throw new apiError(404, "Video not published, please try again")
    }

    return res
            .status(201)
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
    //TODO: get video by id
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}