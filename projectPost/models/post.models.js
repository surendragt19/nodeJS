const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    content:{
        type:String,
    },
    date: {
    type: Date,
    default: Date.now
  },
  likes:[
    {
    type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
  ]
})

module.exports=mongoose.model('post',postSchema)