const mongosse=require('mongoose')

const connectMongoDB=async (url) =>{
    return mongosse.connect(url)
}
module.exports=connectMongoDB;