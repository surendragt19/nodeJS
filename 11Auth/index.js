const express = require('express')
const mongoose=require('mongoose')
const userRouter=require('./routes/userRoutes')
const path=require('path')

const app = express()

//connection
mongoose.connect('mongodb://127.0.0.1:27017/auth')
.then(()=>console.log("Databse Connection Succesful"))
.catch((er)=>console.log("Connection Faield",er))


app.use(express.json())
app.use(express.urlencoded({extended:true}))

//ejs
app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

app.use('/users',userRouter)
app.get('/', (req, res) => res.render('singUp'))
app.get('/login', (req, res) => res.render('login'))

const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))