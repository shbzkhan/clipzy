import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import {User} from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { deleteOnCloudinary, updateOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiError } from "../utils/ApiError.js";
import { apiResponse } from "../utils/ApiResponse.js";
import {OAuth2Client} from "google-auth-library"
import { generateUniqueUsername } from "../utils/usernameGenrator.js";

//googleClientId
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//generateAccessAndRefreshToken
const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new apiError(404, "User not found")
        }

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})
    return {accessToken, refreshToken}
    } catch (error) {
        throw new apiError(500, "Something went wronge when genrate access or refresh token");
    }
}

//register controller
const userRegister = asyncHandler(async (req, res) => {
    //frontend se data lena
    //data ko validate karana
    // find karna ki user already hai ya nhi
    //agar mil gaya to ham error de denage
    //user se image or avatar ka path lena 
    //avatar ko validate karna
    //cloudinary per upload karna
    //fir validate karna ki upload hua hai ya nhi
    //user ka data data base me store karna
    //user ko validate karna ki db me add hua hai ya nhi fir usme se kuchh field ko hide karna
    //return res
    const { username, email, fullname, password } = req.body;
    if (!username || !email || !fullname || !password) {
        throw new apiError(400, "All fields are required")
    }

    const existUser = await User.findOne({
        $or:[{username},{email}]
    })
    if (existUser) {
        throw new apiError(401, "User already exist")
    }

    // const avatarLocalPath = req.file?.path
    // if (!avatarLocalPath) {
    //     throw new apiError(404, "Avatar is required, please upload avatar")
    // }


    // const avatar = await uploadOnCloudinary(avatarLocalPath)
    // if(!avatar){
    //     throw new apiError(404, "Avatar is required");
    // }

    const user = await User.create({
        username,
        email,
        password,
        fullname,
        avatar: `https://api.dicebear.com/9.x/initials/png?seed=${fullname}`,
        coverImage:"",
        fcmToken:""
    })

    const createdUser = await User.findOne(user._id).select("-password -refreshToken")
    if (!createdUser) {
        throw new apiError(404, "Something went wrong while creating user")

    }
    return res.status(201).json(
        new apiResponse(201, createdUser, "User registered succesfully")
    );
})

// login controller
const loginUser = asyncHandler(async (req, res) => {
    //req.body - data
    //userfind karenge
    //password match
    //generate access and refress token
    //cookies me store karenge
    //return res
    const { email, password, fcmToken } = req.body
    
    if (!email) {
        throw new apiError(400, "email are required")
    }

    const user = await User.findOne({email})

    if (!user) {
        throw new apiError(404, "Invalid user credantials");
    }

    const validatePassword = await user.isPasswrodCorrect(password)

    if (!validatePassword) {
        throw new apiError(401, "Invalid user credantials");
    }

    if (fcmToken && user.fcmToken !== fcmToken) {
          user.fcmToken = fcmToken;
          await user.save({ validateBeforeSave: false });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loginUser = await User.findById(user._id).select(
      "-password -refreshToken -watchHistory"
    );
    const options ={
        httpOnly: true,
        secure: true
    }

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
          new apiResponse(
              200,
              {user:loginUser, accessToken, refreshToken},
              "User logged In")
      )
})

//google login
const goolgeLogin = asyncHandler(async (req, res)=>{
    const { idToken, fcmToken } = req.body
    if(!idToken){
        throw new apiError(400, "id-token is required")
    }
    const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    })
    if(!ticket){
        throw new apiError(400, "Error ticket, Please try again later")
    }

    const payload = ticket.getPayload()
    if(!payload){
        throw new apiError(400, "Error payload, Please try again later")
    }
    
    let user = await User.findOne({email:payload.email})

    if(!user){
        const username = payload.email.split("@")[0]
       user = await User.create({
            googleId:payload.sub,
            fullname:payload.name,
            email:payload.email,
            avatar:payload.picture,
            username,
            fcmToken
        })
    }else{
        if (fcmToken && user.fcmToken !== fcmToken) {
          user.fcmToken = fcmToken;
          await user.save({ validateBeforeSave: false });
        }
    }
    
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loginUser = await User.findById(user._id).select(
      "-password -refreshToken -watchHistory"
    )
    
    const options ={
        httpOnly: true,
        secure: true
    }

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
          new apiResponse(
              200,
              {user:loginUser, accessToken, refreshToken},
              "User logged In")
      )
})

//logout controller
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1,
            }
        },
        {
            new: true
        }
    )
    
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new apiResponse(200, {}, "User logged Out"));
    
})

//refereh access token controller
const refreshAccessToken = asyncHandler(async (req, res)=>{
    const incomingToken = req.cookies?.refreshToken || req.body?.refreshToken
    console.log("incoming token hear", incomingToken)
    if(!incomingToken){
        throw new apiError(401, "Refresh token not found")
    }
    const decoded = jwt.verify(incomingToken, process.env.REFRESH_TOKEN_SECRET)
    
        if(!decoded){
            throw new apiError(401, "Unauthorized")
        }
    
        const user = await User.findById(decoded?._id).select("-password")

        if (!user) {
            throw new apiError(401,"Invalid Refresh Token")
        }

        if (incomingToken !== user.refreshToken) {
            throw new apiError(401,"Unauthorized, token not matched")
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
        console.log("new Refresh Token", refreshToken)

        const options = {
            httpOnly: true,
            secure: true,
        };

        return res
                .status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .json(
                    new apiResponse(
                        203,
                        {
                            accessToken, 
                            refreshToken
                        },
                        "Access Token Refreshed"
                    )
                )

            

})

//current user controller
const getCurrentUser = asyncHandler(async(req, res)=>{
    return res
            .status(200)
            .json(
                new apiResponse(
                    200,
                    {user: req.user},
                    {new: true}
                )
            )
})

//change   Password
const changePassword = asyncHandler(async(req, res)=>{
     /* 
     req.bod -> data,
     validation on data
     req.user._id se user fetch karenge,
     fir user per validation lagayenge
     current password ko varfied karenge 
     new pasword ko set karenge 
    res bhej denge
    */
   const {currentPassword, newPassword} = req.body;
   if(!currentPassword || !newPassword){
     throw new apiError(400, "All fields are required")
   }
   if(currentPassword === newPassword){
     throw new apiError(400, "Current & New password both are same")
   }
   const user = await User.findById(req.user._id)
   if (!user) {
            throw new apiError(404,"Unauthorized user")
        }
   const validatePassword = await user.isPasswrodCorrect(currentPassword)
   if(!validatePassword){
    throw new apiError(401, "Current password invalid")
   }

    user.password =  newPassword
    await user.save({validateBeforeSave: false})
    return res
            .status(200)
            .json(new apiResponse(200, {}, "Password changed successfully"))

})

//update account details
const updateAccoutDetails = asyncHandler(async(req, res)=>{
    /* 
    req.body -> data
    validate data
    find user from req.user and update fileds
    send res
     */
    const {fullname}= req.body;
    if(!fullname){
     throw new apiError(400, "Fullname are required")
   }
   const user = await User.findByIdAndUpdate(
    req.user._id,
    {
        $set:{
            fullname,
        }
    },
    {new: true}
   ).select("-password -refreshToken")
   return res
            .status(200)
            .json(new apiResponse(200, user, "Account details changed successfully"))
})

//update user avatar
const updateUserAvatar = asyncHandler(async(req, res)=>{
    // req.file -> avatarLocalPath
    //validate avatarLocalPath
    //user fetched from req.user
    // verify user
    // update avatar in cloudinary
    // send res
    const avatarLocalPath = req.file?.path
    if(!avatarLocalPath){
        throw new apiError(400, "Avatar are required")
    }
    const user =  await User.findById(req.user._id)
    if (!user) {
            throw new apiError(404,"Unauthorized user")
        }
    let avatar
    if(user.avatar && user.avatar.includes("cloudinary")){
        const publicId = user.avatar.split("/").pop().split(".")[0]

        avatar = await uploadOnCloudinary(avatarLocalPath)
        if (!avatar.url) {
            throw new apiError(400, "Avatar Image not update try again")
        }

        const deletedAvatar = await deleteOnCloudinary(publicId)
        if (!deletedAvatar) {
            throw new apiError(400, "Avatar not update try again")
        }
    }else if(user.avatar && !user.avatar.includes("cloudinary")){
        avatar = await uploadOnCloudinary(avatarLocalPath)
        if (!avatar.url) {
            throw new apiError(400, "Avatar Image not uploade, try again")
        }   

    }else{
        throw new apiError(400,"Somthing went wrong while updaing user avatar Image")
    }

    await User.findByIdAndUpdate(
            req.user._id,
            {
                $set:{
                    avatar: avatar.url,
                }
            },{
                new:true
            }
        )

    return res
            .status(200)
            .json(
                new apiResponse(200,{}, "Avatar Image Updated successfully")
            )
    
})

//update user cover image
const updateUserCoverImage = asyncHandler(async(req, res)=>{
    // req.file -> coverLocalPath
    //validate coverImageLocalPath
    //user fetched from req.user
    // verify user
    // update Cover Image in cloudinary
    // send res
    const coverImageLocalPath = req.file?.path
    if(!coverImageLocalPath){
        throw new apiError(400, "Cover Image are required")
    }
    const user =  await User.findById(req.user._id)
    if (!user) {
            throw new apiError(404,"Unauthorized user")
        }
    let coverImage
    if(user.coverImage && user.coverImage.includes("cloudinary")){
        const publicId = user.coverImage.split("/").pop().split(".")[0]
        coverImage = await uploadOnCloudinary(coverImageLocalPath)
        if (!coverImage.url) {
            throw new apiError(400, "Cover Image not update try again")
        }

        const deletedCoverImage = await deleteOnCloudinary(publicId)
        if (!deletedCoverImage) {
            throw new apiError(400, "Avatar not update try again")
        }
    }else if(!user.coverImage || user.coverImage ===""){
        coverImage = await uploadOnCloudinary(coverImageLocalPath)
        if (!coverImage.url) {
            throw new apiError(400, "Cover Image not uploade, try again")
        }

    }else{
        throw new apiError(400,"Somthing went wrong while updaing user Cover Image")
    }

    await User.findByIdAndUpdate(
            req.user._id,
            {
                $set:{
                    coverImage: coverImage.url
                }
            },{
                new:true
            }
        )

    return res
            .status(200)
            .json(
                new apiResponse(200,{}, "Cover Image Updated successfully")
            )
    
})

//get user channel profile
const getUserChannelProfile = asyncHandler(async(req, res)=>{
    //phle ham user ko match karenge user data base se using $match
    //new fields join karenge user me jaise subscriber and subscribed using $lookup
    // new filed add karenge in users using $addfileds
    //isSubscribed find karenge if then and else  
    //fir ham ye insure karenge ki kya kya value bhejen forntend ko using $project
    const {username} = req.params;
    if(!username?.trim()){
        throw new apiError(400, "Username are required")
    }
    const channel = await User.aggregate([
        {
            $match:{
                username: username
            }
        },
        {
            $lookup:{
                from:"subscriptions",
                localField:"_id",
                foreignField:"channel",
                as:"subscribers"
            }
        },
        {
            $lookup:{
                from:"subscriptions",
                localField:"_id",
                foreignField:"subscriber",
                as:"subscribedTo"
            }
        },
        {
            $addFields:{
                subscribersCount:{
                    $size:"$subscribers"
                },
                channelSbuscribedToCount:{
                    $size:"$subscribedTo"
                },
                isSubscribed:{
                    $cond:{
                        if:{$in: [req.user._id,"$subscribers.subscriber"]},
                        then:true,
                        else:false
                    }
                }
            }
        },
        {
            $project:{
                username:1,
                fullname:1,
                avatar:1,
                coverImage:1,
                subscribersCount:1,
                channelSbuscribedToCount:1,
                isSubscribed:1
            }
        }
    ])

    if(!channel?.length){
        throw new apiError(404, "Channel does not exist")
    }

    return res
            .status(200)
            .json(
                new apiResponse(200, channel[0], "Channel fetched successfully")
            )
})

//get user watch history
const getUserWatchHistory = asyncHandler(async(req, res)=>{
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup:{
                from:"videos",
                localField:"watchHistory",
                foreignField:"_id",
                as:"watchHistorys",
                pipeline:[
                    {
                        $lookup:{
                            from:"users",
                            localField:"owner",
                            foreignField:"_id",
                            as:"owner",
                            pipeline:[
                                {
                                    $project:{
                                        username:1,
                                        fullname: 1,
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
                ]
            }
        }
        ,
        {
            $addFields:{
                watchHistory:{
                    $map:{
                        input:{ $reverseArray: "$watchHistory" },
                        as:"id",
                        in:{
                            $first:{
                                $filter:{
                                    input:"$watchHistorys",
                                    as:"video",
                                     cond: { $eq: ["$$video._id", "$$id"] }
                                }
                            }
                        }
                    }
                }
            }
        },{
             $project: {
                    watchHistorys: 0
                }
        }
    ])
   
    if(!user){
        throw new apiError(404, "Watch history not fetch")
    }

    return res
            .status(200)
            .json(
                new apiResponse(200 , user[0].watchHistory, "Watch history fetched successfully")
            )
})

export {
    userRegister,
    loginUser,
    goolgeLogin,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    changePassword,
    updateAccoutDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getUserWatchHistory

}