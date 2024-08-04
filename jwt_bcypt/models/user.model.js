import mongoose from "mongoose";
import bcrpt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is Required"],
        unique:true,
    },
    mobile:{
        type:Number,
    },
    refreshToken:{
        type:String
    }


},{timestamps:true})

//hashed password
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    //bcz they always execte when save
    this.password=await bcrpt.hash(this.password,10)
    next()
})


//compare password
userSchema.methods.isPasswordcorrect=async function(password){
    return await bcrpt.compare(password,this.password)
}



//genrate token
userSchema.methods.isGenrateAccessToken=function(){
    return jwt.sign(
        //payload
        {
            _id:this._id,
            email:this.email,
            username:this.username,
        },
        //secret key
        process.env.SEC_TOKEN,
        //object
        {
            expiresIn:process.env.SCE_TOKEN_EXP
        }
)

}


//genrate Refresh token
userSchema.methods.genrateRefreshToken=function(){
    return jwt.sign(
        //payload
        {
            _id:this._id,
        },
        //secret key
        process.env.REF_TOKEN,
        //object
        {
            expiresIn:process.env.REF_TOKEN_EXP
        }
)

}

export const User=mongoose.model('User',userSchema)