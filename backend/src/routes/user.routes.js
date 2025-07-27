import { Router } from "express";
import { 
    changePassword,
    getCurrentUser,
    getUserChannelProfile,
    getUserWatchHistory,
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    updateAccoutDetails, 
    updateUserAvatar, 
    updateUserCoverImage, 
    userRegister 
    } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { auth } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/register").post(upload.single("avatar"),userRegister)
router.route("/login").post(loginUser)
router.route("/logout").post(auth,logoutUser)
router.route("/refresh-token").post(auth,refreshAccessToken)
router.route("/current").get(auth, getCurrentUser)
router.route("/password-change").patch(auth,changePassword)
router.route("/update-account").patch(auth, updateAccoutDetails)
router.route("/avatar").patch(auth, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(auth, upload.single("coverImage"), updateUserCoverImage)
router.route("/c/:username").get(auth, getUserChannelProfile)
router.route("/watch-history").get(auth, getUserWatchHistory)

export default router