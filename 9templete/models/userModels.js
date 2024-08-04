const mongoose = require('mongoose');

const empSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
    },
    job:{
        type:String,
    },
},{timestamps:true})

const empModels=mongoose.model('employe',empSchema)
module.exports=empModels;