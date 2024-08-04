const express=require('express')
const router=express.Router()
const userModel=require('../models/userModels')

const {jwtAuthMiddleware,generateToken}=require('../jwt')
//post
// router.post('/',async(req,res)=>{
//     const {name,email,phone,work,username,password}=req.body;
//     try {
//         const users=await userModel.create({
//             name,email,phone,work,username,password
//         })
//         res.status(201).json({msg:'User Created',users})
        
//     } catch (error) {
//         res.status(501).json({msg:'Eroor Internal',error})
//     }
// })

router.post('/singup',async(req,res)=>{
    try {
        const data=req.body;
        const newUser=new userModel(data)
        const response=await newUser.save()
        //genrate token
        const payload={
            id:response.id,
            email:response.email
        }
        const token=generateToken(payload)
        res.status(201).json({msg:'User Created',response, token:token})
        
    } catch (error) {
        res.status(501).json({msg:'Eroor Internal',error})
    }
})


//login

router.post('/login',async(req,res)=>{
    try {
        const {username,password}=req.body;
        const user=await userModel.findOne({username:username}) 
        if(!user || !(await user.comparePassword(password))){
            res.status(401).json({msg:'email or password wrong'})
        }
        const payload={
            id:user.id,
            username:user.username
        }
        //genrate token
        const token =user.generateToken(payload)
        res.status(201).json({Token:token})
        
    } catch (error) {
        res.status(501).json({msg:'Eroor Internal',error})   
    }
   
})

//get
router.get('/',async(req,res)=>{
    try {
        const allUser=await userModel.find()
        res.status(201).json({msg:'All User',allUser})
    } catch (error) {
        res.status(501).json({msg:'Eroor Internal',error})
    }
})


//id
router.get('/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const singleUser=await userModel.findById(id)
        if(!singleUser){
            res.status(401).json({msg:'User mot found'})
        }
        res.status(201).json({msg:'Single User',singleUser})
    } catch (error) {
        res.status(501).json({msg:'Eroor Internal',error})
    }
})


//by work
router.get('/:workType',async(req,res)=>{
    try {
        const workType=req.params.workType;
        if(workType=="student" || workType=="job" || workType=="faculty"){
            const user=await userModel.find({work:workType})
            res.status(200).json({msg:'User List',user})
        }else{
            res.status(401).json({msg:'User not found'})
        }
    } catch (error) {
        res.status(501).json({msg:'Eroor Internal',error})
    }
})


//delete

router.delete('/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const singleUser=await userModel.findByIdAndDelete(id)
        if(!singleUser){
            res.status(401).json({msg:'User mot found'})
        }
        res.status(201).json({msg:'User Delete',singleUser})
    } catch (error) {
        res.status(501).json({msg:'Eroor Internal',error})
    }
})


//put
// router.put('/:id',async(req,res)=>{
//     try {
//         const {id}=req.params;
//        const result= await userModel.findByIdAndUpdate(id,{name:"Ravi"})
//        if(!result){
//         res.status(401).json({msg:'User mot found'})
//         }
//         res.status(201).json({result})
//     } catch (error) {
//         res.status(501).json({msg:'Eroor Internal',error})
//  }})

 //put
router.put('/:id',async(req,res)=>{
    try {
        const personid=req.params.id;
        const updateduser=req.body;
        const response=await userModel.findByIdAndUpdate(personid,updateduser,{
            new:true,
            runValidators:true,
        })
        if(!response){
            res.status(401).json({msg:'User mot found'})
        }
        res.status(201).json({response})
    } catch (error) {
        res.status(501).json({msg:'Eroor Internal',error})
 }})


 //patch
 router.patch('/:id',async(req,res)=>{
    try {
        const personid=req.params.id;
        const updateduser=req.body;
        const response=await userModel.findByIdAndUpdate(personid,updateduser,{
            new:true,
            runValidators:true,
        })
        if(!response){
            res.status(401).json({msg:'User mot found'})
        }
        res.status(201).json({response})
    } catch (error) {
        res.status(501).json({msg:'Eroor Internal',error})
 }})



module.exports=router;