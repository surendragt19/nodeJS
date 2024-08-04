const express=require('express');
const router=express.Router();

const userController=require('../controller/users')

router
.post('/',userController.create)
.get('/',userController.readAll)
.get('/:id',userController.read)
.put('/:id',userController.replace)
.patch('/:id',userController.update)
.delete('/:id',userController.remove)

exports.router=router;