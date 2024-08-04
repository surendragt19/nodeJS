const express = require('express')
const app = express()
const port = 3000
const mongoose=require('mongoose')
const { type } = require('os')
const path=require('path')

//Database connection
mongoose.connect('mongodb://127.0.0.1:27017/ejs')
.then(()=>console.log("Databse Connection Succesful"))
.catch((er)=>console.log("Connection Faield",er))

//middlewear 
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//ejs -> Template engisne
app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

//schema
const stdSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    address:{
        type:String,
        required:true,
    },
    msg:{
        type:String,

    }
},{timestamps:true})

//models
const stdModels=mongoose.model('student',stdSchema)

//render page
app.get('/', (req, res) => res.render('form'))

//send data using form

app.post('/form',async(req,res)=>{
    const {name,email,msg,address}=req.body;
    try {
        const studentRegistrion=new stdModels({name,email,msg,address}) 
        await studentRegistrion.save()
        console.log(studentRegistrion)
        res.redirect('/users')
    } catch (error) {
        res.status(501).json({ status: 'Server Error', error });
    }
})


//get registraion user
app.get('/users',async(req,res)=>{
   try {
    const result=await stdModels.find({})
    res.render('card',{stdData:result})
   } catch (error) {
    res.status(501).json({Message:'Intenal Server Error',error})
   }

})

app.listen(port,()=>{
    console.log(`Server is staarted in port ${port}`)
})