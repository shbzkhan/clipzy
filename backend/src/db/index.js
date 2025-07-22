import mongoose from 'mongoose'
import { DB_NAME } from '../constant.js'

const connectDB = async () => {
    try {
        const connectInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log("MONGODB CONNECTED!!! HOST: ",connectInstance.connection.host)
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED!!!", error)
        process.exit(1)
    }
}

export {connectDB}