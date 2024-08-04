const express=require('express')
const router=express.Router()
const {handleEmpCreate,haldleEmpGet} =require('../controllers/userController')

router.post('/',handleEmpCreate).get('/',haldleEmpGet)
module.exports=router;