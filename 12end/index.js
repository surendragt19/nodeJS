const express = require('express')
const dotenv=require('dotenv')
dotenv.config()
const connectMongoDB=require('./db/db')
const userRouter=require('./routes/userRoute')
const passport=require('./passpost_auth')

const app = express()

//connection
connectMongoDB(process.env.MONGO_URL)
.then(()=>console.log("Database Connect"))
.catch((e)=>console.log("Db Connection Faielld",e))

//middlewear ->protect route
const logRequest=(req,res,next)=>{
    console.log(`url click time in : ${new Date().toLocaleString()} and End Point is : ${req.originalUrl}`)
    next()
}

//pasport js
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false})

//middlewear
app.use(express.json())
app.use(logRequest)
app.use('/api',userRouter)



app.get('/',logRequest,(req, res) => res.send('Hello World!'))


const port=process.env.PORT || 3000
app.listen(port, () => console.log(`Server listening on port ${port}!`))
