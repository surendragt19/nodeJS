const express=require('express')
const fs=require('fs')
const data=require('./data.json');
const exp = require('constants');
const app=express();



app.use(express.json())
app.get('/api',(req,res)=>{
    res.status(200).json(data)
    console.log("Check1")
})

//single item
app.get('/api/:id',(req,res)=>{
    const id=req.params.id;
    const users=data.find((data) => data.id==id)
    res.status(200).json(users)
    console.log("Check2")
})

app.use((req,res,next)=>{
    console.log("Hello Middlewear")
    next()
})

//post

app.post('/api',(req,res)=>{
    const body=req.body;
    const user1=data.push({...body, id:data.length + 1})
    fs.writeFile("./data.json",JSON.stringify(data),(error,result)=>{
        console.log(error)
        console.log("Check3")
        return res.status(201).json({result, id:data.length})
    })
})





const port=8000;
app.listen(port,()=>{
    console.log(`Server is started ${port}`)
})