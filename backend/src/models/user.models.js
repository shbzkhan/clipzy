import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
    
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    }

},{})