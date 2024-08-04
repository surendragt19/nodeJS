const fs=require('fs')
const index=fs.readFileSync('index.html','utf-8')  //send static file
const data=JSON.parse(fs.readFileSync('data.json','utf-8'))  //send json data file
const products=data.products;

const express=require('express');
const server=express()


//bodyParsar = use to send json in post
server.use(express.json())
server.use(express.static('public'))


//api root , base url,   exp- google.com/api/v2/

//POST  = Create api -> /products
server.post('/products',(req,res)=>{
    console.log(req.body)
    products.push(req.body)
    res.status(201).json(req.body)
})


//GET - Read API   -> /products  ->2 type get api
server.get('/products',(req,res)=>{
    res.json(products)
})

//GET - Read API   -> /products/:id
server.get('/products/:id',(req,res)=>{
    // console.log(req.params)
    const Id=+req.params.id    //convert number using +
    const pro=products.find(p=>p.id=Id)
    res.json(pro)
})


//PUT - Update API   -> /products/:id 
// ---->old data override that means if 3 data in 1 id and u update 1 data so the id 1 is store 1 data
server.put('/products/:id',(req,res)=>{
    const Id=+req.params.id  
    const proIndex=products.findIndex(p=>p.id=Id)
    products.splice(proIndex,1,{...req.body,id:Id})
    res.status(201).json()
})


//PATCH - Update API   -> /products/:id
//-> patch m override nhi hote jo update kroge wo hog baaki sb waise rahega hatega nahi
server.patch('/products/:id',(req,res)=>{
    const Id=+req.params.id  
    const proIndex=products.findIndex(p=>p.id=Id)
    const oldP_Data=products[proIndex]
    products.splice(proIndex,1,{...oldP_Data,...req.body})
    res.status(201).json()
})


//DeLETE - Delete API   -> /products/:id 
// ---->old data override that means if 3 data in 1 id and u update 1 data so the id 1 is store 1 data
server.delete('/products/:id',(req,res)=>{
    const Id=+req.params.id  
    const proIndex=products.findIndex(p=>p.id=Id)
    const oldP_Data=products[proIndex]  //opt
    products.splice(proIndex,1)
    res.status(201).json(oldP_Data)
})


const Port=3000;
server.listen(Port,()=>{
    console.log(`Server is Start in Port : ${Port}`)
})


