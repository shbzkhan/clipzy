import User from "../models/user.model.js"
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadToCloudinary } from "../utils/cloudinary.js";


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

export {
    userRegister
}