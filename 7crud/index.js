const express=require('express')
const mongoose=require('mongoose')
const colors = require('colors');
const app=express()

app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/node2')
.then(()=>console.log('Db Connectted'.white.bgMagenta))
.catch((e)=>console.log("Error",e))

const stdSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    roll:{
        type:Number,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    clg:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
    }
},{timestamps:true})


const StudentModel=mongoose.model('student',stdSchema)

//post
app.post('/users',async(req,res)=>{
    const {name,email,phone,clg,roll}=req.body;
    try {
        const studentData=await StudentModel.create({
            name:name,
            email:email,
            phone:phone,
            clg:clg,
            roll:roll
        })
        res.status(201).json({Status:'Student is created',studentData})
        console.log(studentData)
    } catch (error) {
        console.log(error)
        res.status(501).json({msg:'internal server eroor'})
    }
})

//get
app.get('/users',async(req,res)=>{
    try {
        const result=await StudentModel.find({})
        if(!result){
            res.status(401).json({msg:'User not foud'})
        }
        res.status(200).json({msg:'All Users',result})
        
    } catch (error) {
        console.log(eroor)
        res.status(501).json({msg:'internal eroor'})
    }
})

//single

app.get('/users/:id',async(req,res)=>{
    const id=req.params.id;
    try {
        const singleUser=await StudentModel.findById(id)
        if(!singleUser){
            res.status(401).json({mg:'User not found'})
        }
        res.status(200).json({msg:'single user Details',singleUser})
    } catch (error) {
        res.status(501).json({msg:'Internal server eroor'})
    }

})

//delete
app.delete('/users/:id',async(req,res)=>{
    const {id}=req.params;
    try {
        const result=await StudentModel.findByIdAndDelete(id)
        res.status(203).json({msg:'User Delete',result})
    } catch (error) {
        res.status(501).json({msg:'server eroor'})
    }
})

//update
app.patch('/users/:id',async(req,res)=>{
    const {id}=req.params;
    try {
        const result=await StudentModel.findByIdAndUpdate(id,{clg:'Hewett'})
        res.status(203).json({msg:'User Update',result})
    } catch (error) {
        res.status(501).json({msg:'server eroor'})
    }
})

//update
app.put('/users/:id',async(req,res)=>{
    const {id}=req.params;
    try {
        const result=await StudentModel.findByIdAndUpdate(id,{clg:'Luck'})
        res.status(203).json({msg:'User Update',result})
    } catch (error) {
        res.status(501).json({msg:'server eroor'})
    }
})

const port=8000;
app.listen(port,()=>{
    console.log(`server is sratarted  ${port}`.bgBlue.black)
})