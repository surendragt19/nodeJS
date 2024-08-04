const express = require('express')
const router=express.Router()
const {userSingup,userSingIn}=require('../controllers/userController')



router.post('/',userSingup)
router.post('/login',userSingIn)

module.exports=router;