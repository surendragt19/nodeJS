const express=require('express')
const mongoose=require('mongoose')
const app=express()


app.use(express.json())
//database connect
mongoose.connect('mongodb://127.0.0.1:27017/nodeTest1')
.then(()=>console.log('Database Connect'))
.catch((e)=>console.log('not Connect',e))



//schema
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    address:{
        type:String
    },
    
},{timestamps:true})
//model
const User=mongoose.model('user',userSchema);


//http method
//post
app.post('/users',async (req,res)=>{
    const {name,email,phone,address}=req.body;
    const result=await User.create({
        name:name,
        email:email,
        phone:phone,
        address:address
    })
    console.log(result)
    return res.status(201).json({msg:'Success'})

})

//get all
app.get('/users',async(req,res)=>{
    const result=await User.find({});
    try {
        res.status(200).json(result)
        console.log(result)
    } catch (error) {
        console.log(error)   
    }
})

//get single
app.get('/users/:id',async(req,res)=>{
    try {
        const user=await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        console.log(user)
        return res.json({msg:'success',user})
    } catch (error) {
        res.status(501).json({msg:'field'})
        console.log(error)
    }
    
})

//delete

app.delete('/users/:id',async(req,res)=>{
    const {id}=req.params;
    try {
        const result=await User.findByIdAndDelete(id)
        if(!result){
            res.status(401).json({msg:'user not found'})
        }
        console.log(result)
        return res.status(200).json({Msg:'User is deleted',result}) 
        
    } catch (error) {
        console.log(error)
        res.status(501).json({msg:'internal server error'})
    }
})


//update
app.patch('/users/:id',async(req,res)=>{
    const {id}=req.params;
    try {
        const updatedUsers=await User.findByIdAndUpdate(id,{address:'Chafa'})
        if(!updatedUsers){
            res.status(401).json({status:'User not found'});
        }
        res.status(200).json({status:'User Details Update',updatedUsers})
    } catch (error) {
        console.log(error)
        res.status(501).json({status:'Internal eroor'})
    }
})

const port= 8000;
app.listen(port,()=>{
    console.log(`Server is Started in Port : ${port}`)
})