import dotenv from "dotenv"
import { connectDB } from "./db/index.js";
import { app } from "./app.js";



//env cofig
dotenv.config({
  path: "./env",
});




connectDB()
    .then(() => {
        app.on("error", error => {
            console.log("MONGODB CONNECTION ERROR ", error)
        })

        app.listen(process.env.PORT || 5000, () => {
            console.log("Server run on port: ", process.env.PORT);
        })
    })
    .catch(error => {
        console.log("MONGODB CONNECTION FAILED!!!", error);
    })