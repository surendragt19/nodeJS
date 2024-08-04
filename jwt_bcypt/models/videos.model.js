import mongoose from "mongoose";
const videoSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    discription:{
        type:String,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    category:{
        type:String,
        enum:["Funny","Horor","Roast"]
    },
},{timestamps:true})

export const Video=mongoose.model('Video',videoSchema)