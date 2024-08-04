const express=require ('express')
const app=express()
const mongoose = require('mongoose');
const { Schema } = mongoose;

//connect Server
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/demo');
  console.log('DB is connected to Mongo Compass in LocalHost')
}

//MiddleWear to use POST
app.use(express.json())


//create schema
const practiceSchema = new Schema({
  name: {type:String, required:true, unique:true} ,
  address: String,
  number: {type:Number},
  college: String,
  roll:{type:Number,min:[0,'Enter Correct Roll No'], max:[240,'Not Exists This Roll No']},
  email: {type:String}
});
const practice = mongoose.model('practice', practiceSchema);

//POST HTTP
app.post('/user',async (req, res) => {
    try {
        const practData = new practice(req.body);
        const doc = await practData.save();
        res.status(201).json(doc);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

//read all Users
app.get('/user',async (req,res)=>{
    const getData=await practice.find()
   res.json(getData)
})

//read data by name
app.get('/uF',async(req,res)=>{
    const name=await practice.find({'name':'Sur'});
    res.status(200).json(name)
})

//read single users
app.get('/u1/:id', async (req, res) => {
    const userId = req.params.id;    
    const user = await practice.findById(userId);
    res.json(user);
});

//replace 
app.put('/user/:id', async(req,res)=>{
   const Id=req.params.id;
   const data=await practice.findOneAndReplace({_id:Id},req.body,{new:true})  //{new:true} to use the show the current update to postman 
   try {
    res.status(200).json(data)
   } catch (error) {
    console.log(error)
    res.status(400).json(error)
   }
})

//update
app.patch('/user/:id',async(req,res)=>{
    const id=req.params.id;
    const updateData=await practice.findOneAndUpdate({_id:id},req.body,{new:true})
    try {
        res.status(200).json(updateData)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
        
    }
})


//delete
app.delete('/user/:id',async(req,res)=>{
    const dId=req.params.id;
    const data = await practice.findOneAndDelete({_id:dId},req.body,{new:true});
    res.status(201).json(data)
})



//Server
port =3000;
app.listen(port,()=>{
    console.log(`Server is started on Port : ${port}`)
})

