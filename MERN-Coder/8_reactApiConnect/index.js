const express=require('express');
const server=express();
const productRouter=require('./routes/proRouter')
const userRouter=require('./routes/user')
const mongoose = require('mongoose');


main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
  console.log('DB Connectted')
}


server.use(express.json())
server.use('/products',productRouter.router) 
server.use('/users',userRouter.router)


const Port=8080;
server.listen(Port,()=>{
    console.log(`Server is Start in Port : ${Port}`)
})








// NDVWl2RWGLEtiw7s
// surendragt07
// mongosh "mongodb+srv://cluster0.umxbpyc.mongodb.net/" --apiVersion 1 --username surendragt07