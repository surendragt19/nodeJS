import { User } from "../models/user.model.js";

//method to genrate access and refresh token
const genrateRefreshAcssesToken=async(userId)=>{
    try {
        const user=await User.findById(userId)
        const accessToken=user.isGenrateAccessToken()
        const refreshToken=user.genrateRefreshToken()

        user.refreshToken=refreshToken

        await user.save({validateBeforeSave:false})
        return{accessToken,refreshToken}
    } catch (error) {
        console.log(error)
        res.status(501).json({msg:"Server Error when genrate token"})
    }
}

export const createUserController=async (req,res)=>{
    try {
        //get data from frontend
        const {username,email,password,mobile}=req.body;

        //check validation
        if (typeof username !== 'string' || username.trim() === "") {
            return res.status(400).json({ msg: "Username is required" });
        }
        if (typeof email !== 'string' || email.trim() === "") {
            return res.status(400).json({ msg: "Email is required" });
        }
        if (typeof password !== 'string' || password.trim() === "") {
            return res.status(400).json({ msg: "Password is required" });
        }

        //exist user
        const existUsr=await User.findOne({
            $or:[{username},{email}]
        })
        if(existUsr){
            res.status(401).json({msg:"Email or Username Already Exist"})
        }

        //new users create
        const newUser=await User.create({
            username,email,password,mobile
        })
        res.status(201).json({msg:"User Created Succesfully",newUser})
    } catch (error) {
        console.log(error)
        res.status(501).json({msg:"Server Error when registraion"})
    }

}



//login

export const loginController=async(req,res)=>{
    try {
        const {username,email,password}=req.body;

    //check username and email
    if (!username && !email) {
        return res.status(400).json({ msg: "Email and username are required" });
    }
    //find user
    const user=await User.findOne({
        $or:[{email},{username}]
    })
    if(!user){
        res.status(400).json({msg:"User not exits"})
    }
    //check password
   const passwordCheck=await user.isPasswordcorrect(password)
   if(!passwordCheck){
    res.status(400).json({msg:"Password is Incoreect"})
}

    //token
    const {refreshToken,accessToken}=await genrateRefreshAcssesToken(user._id)

    const logUser=await User.findById(user._id).select("-passsword -refreshToken")

    //cookie send
    const options={
        httpOnly:true,
        secure:true,
    }
    return res
    .status(200)
    .cookie("access Token",accessToken,options)
    .cookie("refresh token",refreshToken,options)
    .json({ msg: "Login successful", accessToken, refreshToken })


    //if all correct
    // console.log(user)
    // res.status(200).json({ msg: "Login successful", user, accessToken, refreshToken });
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Server Error when login" });
    }
}



//logOut

const logoutUser=async(req,res)=>{
    
}