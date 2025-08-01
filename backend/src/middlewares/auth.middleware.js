import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const auth = asyncHandler(async(req, res, next)=>{
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    if(!token){
        throw new apiError(401, "Unauthorized, token not available")
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    if(!decoded){
        throw new apiError(401, "Unauthorized")
    }

    const user = await User.findById(decoded?._id).select("-password -refreshToken")
            
            if (!user) {
                throw new apiError(401,"Invalid Access Token")
            }
    
            req.user = user;
            next()
})

export {auth}