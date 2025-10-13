import express, { response } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import admin from "firebase-admin";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import fs from "fs";
const serviceAccount = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./utils/serviceAccountKey.json"), "utf8")
);

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
})

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}))

// app.post("/api/v1/send-notification", async (req, res) => {
//   const { token, title, body, imageUrl } = req.body;
//   try {
//     sendNotificationToDevice({
//       token,
//       title,
//       body,
//       imageUrl
//     })
//     res.status(200).json({ success: true, response });
//   } catch (error) {
//     res.status(500).json({ success: false, error });
//   }
// });

//import route statement
import userRouter from "./routes/user.routes.js"
import videoRouter from "./routes/video.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js"
import likeRouter from "./routes/like.routes.js"
import commentRouter from "./routes/comment.routes.js";
import playlistRouter from "./routes/playlist.routes.js"
import tweetRouter from "./routes/tweet.routes.js"
import { sendNotificationToDevice } from "./utils/sendNotificationToDevice.js";

//router declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)
app.use("/api/v1/likes", likeRouter)
app.use("/api/v1/comment", commentRouter)
app.use("/api/v1/playlist", playlistRouter)
app.use("/api/v1/tweets", tweetRouter)






export {app}