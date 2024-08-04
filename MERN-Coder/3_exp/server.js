const fs=require('fs')
const index=fs.readFileSync('index.html','utf-8')  //send static file
const data=JSON.parse(fs.readFileSync('data.json','utf-8'))  //send data file
const products=data.products;
const morgan=require('morgan')

const express=require('express');
const server=express()


//middleWear application level
// server.use((req,res,next)=>{
//     console.log(req.method,req.ip,req.hostname,new Date(),req.get('User-Agent'))
//     next()
// })



//third party middleWear
server.use(morgan('default'))


server.use(express.json())   //this is built middlewear to use read post body  --bodyParsar
server.use(express.static('public'))   //this is also built middlewear to use to show the all file in given folder


server.get('/pro/:id',(req,res)=>{
    console.log(req.params)
    res.json({type:'GET USING PARAMS'})
})



//auth l middlewaer
const auth=(req,res,next)=>{
    // console.log(req.query)
    // if(req.query.password=='1234'){
        if(req.body.password=='1234'){
        next()
    }
    else{
        res.sendStatus(401)
    }
}
// server.use(auth)



//api --endpoint, --route
//route middle
server.get('/',auth,(req,res)=>{
    res.json({type:'GET'})
})
server.post('/',auth,(req,res)=>{
    res.json({type:'POST'})
})
server.put('/',(req,res)=>{
    res.json({type:'PUT'})
})
server.patch('/',(req,res)=>{
    res.json({type:'PATCH'})
})
server.delete('/',(req,res)=>{
    res.json({type:'DELETE'})
})



server.get('/demo',(req,res)=>{
    // res.send("<h1>hh</h1>")
    // res.sendFile('C:\Users\Surendra\Desktop\MERN-Coder\3_exp\index.html')
    // res.json(products)

    // res.status(200).json(products)
})

server.listen(8000,()=>{
    console.log("server Start")
})


