const express=require('express')
const router=express.Router()
const userModel=require('../models/user')
const {jwtAuthMiddleware, generateToken} = require('./../jwt');


router.post('/singup',async(req,res)=>{
    const data=req.body;
    try {
        const newUser=new userModel(data)
        const response=await newUser.save()
        //genrate token
        const payload={
            id:response.id
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
        const {aadharCardNumber,password}=req.body;
        const user=await userModel.findOne({aadharCardNumber:aadharCardNumber}) 
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid Aadhar Card Number or Password'});
        }
        const payload={
            id:user.id
        }
        //genrate token
        const token =user.generateToken(payload)
        res.status(201).json({Token:token})
        
    } catch (error) {
        res.status(501).json({msg:'Eroor Internal',error})   
    }
   
})

// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        const userId = userData.id;
        const user = await userModel.findById(userId);
        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Extract the id from the token
        const { currentPassword, newPassword } = req.body; // Extract current and new passwords from request body

        // Check if currentPassword and newPassword are present in the request body
        // if (!currentPassword || !newPassword) {
        //     return res.status(400).json({ error: 'Both currentPassword and newPassword are required' });
        // }
        // Find the user by userID
        const user = await userModel.findById(userId);
        // If user does not exist or password does not match, return error
        if (!user || !(await user.comparePassword(currentPassword))) {
            return res.status(401).json({ error: 'Invalid current password' });
        }
        // Update the user's password
        user.password = newPassword;
        await user.save();

        console.log('password updated');
        res.status(200).json({ message: 'Password updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;