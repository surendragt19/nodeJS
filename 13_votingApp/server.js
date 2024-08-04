const express = require('express')
const app = express()
require('dotenv').config();
const connectMongoDB=require('./config/db')

//connect
connectMongoDB(process.env.MONGO_URL)
.then(()=>console.log("Database Connect"))
.catch((e)=>console.log("Db Connection Faielld",e))


//routes
const userRoutes=require('./routes/userRoutes')
const candidateRoutes=require('./routes/candidateRoutes')

app.use('/user',userRoutes)
app.use('/candidate',candidateRoutes)

//middleEwar
const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); // req.body


app.get('/', (req, res) => res.send('Hello World!'))
const port=process.env.PORT || 3000
app.listen(port, () => console.log(`Server listening on port ${port}!`))