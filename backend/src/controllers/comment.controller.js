import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {apiError} from "../utils/ApiError.js"
import {apiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Like } from "../models/like.model.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query

})

const addComment = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    const {content} = req.body

    if(!videoId){
        throw new apiError(404, "Video id not found")
    }
    if(!content){
        throw new apiError(404, "Comment is required")
    }

    const comment = await Comment.create({
        content,
        video:videoId,
        owner:req.user._id
    })
    if(!comment){
        throw new apiError(400, "Comment not send")
    }

    return res
            .status(201)
            .json(
                new apiResponse(201, comment, "Comment added successfully")
            )
})

const updateComment = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    const {content} = req.body
    if(!commentId){
        throw new apiError(404, "Comment id not found")
    }

    if(!content){
        throw new apiError(404, "Comment is required")
    }

    const comment = await Comment.findById(commentId)

    if(!comment){
        throw new apiError(404, "Comment not found")
    }

    if(comment.owner.toString() !== req.user._id.toString()){
        throw new apiError(401, "Only comment owner can update comment")
    }

    const updatedComment = await Comment.findByIdAndUpdate(
        comment._id,
        {
            $set:{
                content
            }
        },
        {
            new:true
        }
    )

    if (!updatedComment) {
    throw new apiError(500, "Failed to edit comment please try again");
}

return res
    .status(200)
    .json(
        new apiResponse(200, updatedComment, "Comment edited successfully")
    );

})

const deleteComment = asyncHandler(async (req, res) => {
    const {commentId} = req.params

    if(!commentId){
        throw new apiError(404, "Comment id not found")
    }

    const comment = await Comment.findById(commentId)

    if(!comment){
        throw new apiError(404, "Comment not found")
    }

    if(comment.owner.toString() !== req.user._id.toString()){
        throw new apiError(401, "Only comment owner can delete comment")
    }

    await Comment.findByIdAndDelete(commentId)

    await Like.deleteMany({
        comment:commentId,
        likedBy:req.user._id
    })

    return res
    .status(200)
    .json(
        new apiResponse(200, { commentId }, "Comment deleted successfully")
    );
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }