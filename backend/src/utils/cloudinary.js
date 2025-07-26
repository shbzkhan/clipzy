import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
  cloud_name: "my_cloud_name",
  api_key: "my_key",
  api_secret: "my_secret",
});
//upload image or video on cloudinary
const uploadToCloudinary = async (localPath) => {
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

const updateToCloududinary =async(publicId, localPath)=>{
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


export{
    uploadToCloudinary,
    updateToCloududinary
}