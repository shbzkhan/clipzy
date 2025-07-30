import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
//upload image or video on cloudinary
const uploadOnCloudinary = async (localPath) => {
    try {
        const response = await cloudinary.uploader.upload(localPath, {
            resource_type: "auto"
        })
        console.log("FILE UPLOADED ", response)
        fs.unlinkSync(localPath);
        return response
    } catch (error) {
        fs.unlinkSync(localPath)
        return null
    }
}

const updateOnCloudinary =async(publicId, localPath)=>{
try {
        const response = await cloudinary.uploader.upload(localPath, {
            public_id: publicId,
            overwrite: true,
            invalidate: true
        })
        console.log("FILE UPDATED ", response)
        fs.unlinkSync(localPath);
        return response
    } catch (error) {
        fs.unlinkSync(localPath)
        return null
    }
}

const deleteOnCloudinary = async(publicId, resource_type = "image")=>{
    try {
        if(!publicId) return null
        const response = await cloudinary.uploader.destroy(publicId,{
            resource_type:`${resource_type}`
        })
        return response
    } catch (error) {
        console.log("File not deleted from cloudinary", error)
        return error
    }
}


export{
    uploadOnCloudinary,
    updateOnCloudinary,
    deleteOnCloudinary
}