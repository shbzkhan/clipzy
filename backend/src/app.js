import express from "express"
import cors from "cors"



const app = express();

app.use(express.json());
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cors())

//import route statement
import userRouter from "./routes/user.routes.js"

//router declaration
app.use("api/v1/users", userRouter)






export {app}