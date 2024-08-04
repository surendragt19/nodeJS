const express=require('express');
const server=express();
const productRouter=require('./routes/proRouter')
const userRouter=require('./routes/user')
//bodyParsar
server.use(express.json())
server.use(express.static('public'))
server.use('/products',productRouter.router)  //take 2 val => path this is opt give '/'
server.use('/users',userRouter.router)

//Server
const Port=8080;
server.listen(Port,()=>{
    console.log(`Server is Start in Port : ${Port}`)
})


