import dotenv from 'dotenv'
import express from 'express'
import connectDb from './db/index.js'
const app = express()
dotenv.config()
app.use(express.json())
import router from './routes/user.routes.js'
app.use("/api",router)



const port=process.env.PORT || 8000;
connectDb()
.then(()=>{
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    console.log("Database Connect")
    })
    .catch((er)=>{
        console.log("Connection Faield",er)
})


