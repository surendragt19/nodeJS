const express=require('express');
const router=express.Router();

const productController=require('../controller/productControl')

router
.post('/',productController.create)
.get('/',productController.readAll)
.get('/:id',productController.read)
.put('/:id',productController.replace)
.patch('/:id',productController.update)
.delete('/:id',productController.remove)

exports.router=router;