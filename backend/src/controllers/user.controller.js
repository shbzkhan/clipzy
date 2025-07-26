import {User} from "../models/user.model.js"
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { updateToCloududinary, uploadToCloudinary } from "../utils/cloudinary.js";


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
    if (!username || !email || fullname || !password) {
        throw new apiError(400, "All fields are required")
    }

    const existUser = await User.findOne({
        $or:[{username},{email}]
    })
    if (existUser) {
        throw new apiError(401, "User already exist")
    }

    const avatarLocalPath = req.files.avatar[0]?.path
    const coverImageLocalPath = req.files.coverImage[0]?.path

    if (!avatarLocalPath) {
        throw new apiError(404, "Avatar is required")
    }

    const avatar = await uploadToCloudinary(avatarLocalPath)
    const coverImage = await uploadToCloudinary(coverImageLocalPath);
    if(!avatar){
        throw new apiError(404, "Avatar is required");
    }

    const user = await User.create({
        username,
        email,
        password,
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    })

    const createdUser = await User.findOne(user._id).select("-password -refreshToken")
    if (!createdUser) {
        throw new apiError(404, "Something went wrong while creating user")

    }
    return res.status(201).json(
        new apiResponse(201, createdUser, "User register succesfully")
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
    const { username, email, password } = req.body
    
    if (!username && !email) {
        throw new apiError(400, "Username or email are required")
    }

    const user = await User.findOne({
        $or:[{username},{email}]
    })

    if (!user) {
        throw new apiError(404, "Invalid user credantials");
    }

    const validatePassword = user.isPasswrodCorrect(password)
    if (!validatePassword) {
        throw new apiError(401, "Invalid user credantials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loginUser = await User.findById(user._id).select(
      "-password -refreshToken"
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
      .clearCookie("accessToken", accessToken)
      .clearCookie("refreshToken", refreshToken)
      .json(new apiResponse(200, {}, "User logged Out"));
    
})

//refereh access token controller
const refreshAccessToken = asyncHandler(async (req, res)=>{
    const incomingToken = req.cookies?.refreshToken || req.body?.refreshToken
    if(!incomingToken){
        throw new apiError(401, "Refresh token not found")
    }

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    
        if(!decoded){
            throw new apiError(401, "Unauthorized")
        }
    
        const user = await User.findById(decoded?._id).select("-password -refreshToken")
                
        if (!user) {
            throw new apiError(401,"Invalid Refresh Token")
        }

        if (incomingToken !== user.refreshToken) {
            throw new apiError(401,"Unauthorized")
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id)

        return res
                .status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", newRefreshToken, options)
                .json(
                    new apiResponse(
                        203,
                        {accessToken, refreshToken:newRefreshToken},
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
                    {user: req.user._id},
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
   const user = User.findById(req.user._id)
   if (!user) {
            throw new apiError(404,"Unauthorized user")
        }
   const validatePassword = new user.isPasswrodCorrect(currentPassword)
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
    const {fullname, email}= req.body;
    if(!fullname || !email){
     throw new apiError(400, "All fields are required")
   }
   const user = await User.findByIdAndUpdate(
    req.user._id,
    {
        $set:{
            fullname,
            email
        }
    },
    {new: true}
   ).select("-password -refreshToken")
   return res
            .status(200)
            .json(new apiResponse(200, user, "Account details changed successfully"))
})

//update user avatar
const updatUserAvatar = asyncHandler(async(req, res)=>{
    // req.file -> avatarLocalPath
    //validate avatarLocalPath
    //user fetched from req.user
    // verify user
    // update avatar in cloudinary
    // send res
    const avatarLocalPath = req.file.avatar.path
    if(!avatarLocalPath){
        throw new apiError(400, "Avatar are required")
    }
    const user =  await User.findById(req.user._id)
    if (!user) {
            throw new apiError(404,"Unauthorized user")
        }
    
    if(!(user.avatar && user.avatar.includes("cloudinary"))){
        throw new apiError(400,"Somthing went wrong while updaing user avatar")
    }

    const publicId = user.avatar.split("/").pop().split(".")[0]
    const avatar = await updateToCloududinary(publicId, avatarLocalPath)
    if (!avatar) {
        throw new apiError(400, "Avatar not update try again")
    }

    return res
            .status(200)
            .json(
                new apiResponse(200,{}, "Avatar Updated successfully")
            )
    
})

//update user cover image
const updatUserCoverImage = asyncHandler(async(req, res)=>{
    // req.file -> coverLocalPath
    //validate coverImageLocalPath
    //user fetched from req.user
    // verify user
    // update Cover Image in cloudinary
    // send res
    const coverImageLocalPath = req.file.coverImage.path
    if(!coverImageLocalPath){
        throw new apiError(400, "Cover Image are required")
    }
    const user =  await User.findById(req.user._id)
    if (!user) {
            throw new apiError(404,"Unauthorized user")
        }
    
    if(user.coverImage && user.coverImage.includes("cloudinary")){
        const publicId = user.coverImage.split("/").pop().split(".")[0]
        const coverImage = await updateToCloududinary(publicId, coverImageLocalPath)
        if (!coverImage) {
            throw new apiError(400, "Cover Image not update try again")
        }
    }else if(!user.coverImage || user.coverImage ===""){
        const coverImage = await uploadToCloudinary(coverImageLocalPath)
        if (!coverImage) {
            throw new apiError(400, "Cover Image not uploade, try again")
        }   
    }else{
        throw new apiError(400,"Somthing went wrong while updaing user Cover Image")
    }

    return res
            .status(200)
            .json(
                new apiResponse(200,{}, "Cover Image Updated successfully")
            )
    
})

export {
    userRegister,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    changePassword,
    updateAccoutDetails,
    updatUserAvatar,
    updatUserCoverImage

}