const mongoose=require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/miniProjectPost')
.then(()=>{
    console.log("DB Connected")
})
.catch((err)=>{
    console.log("DB Connection faield",err)
})

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        default: 18
    },
    post:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"post"
        }
    ]
},{timestamps:true})

module.exports=mongoose.model("user",userSchema)