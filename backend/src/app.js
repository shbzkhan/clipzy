import express from "express"
import cors from "cors"



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cors({
    origin: "*",
    credentials: true
}))

//import route statement
import userRouter from "./routes/user.routes.js"

//router declaration
app.use("/api/v1/users", userRouter)






export {app}