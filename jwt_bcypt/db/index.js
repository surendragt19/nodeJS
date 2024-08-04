import mongoose from "mongoose";

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Conection Success !!")
    } catch (error) {
        console.log("Connection Faield")
        process.exit(1)
    }
}

export default connectDB