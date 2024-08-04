const express=require('express')
const users=require('./DATA.json')
const fs=require('fs')

const app=express()

app.get('/user',(req,res)=>{
    res.json(users)
})
//single user
app.get('/user/:id',(req,res)=>{
    const uid=req.params.id;
    const idUser=users.find((users) => users.id==uid)
    res.json(idUser)

})

//post
app.post('/user',(req,res)=>{
    const body=req.body;
    users.push({...body,id:users.length+1})
    fs.writeFile("./Data.json",JSON.stringify(users),(err,result)=>{
        return res.json({status:'success',id: users.length})
}  
)
})

app.delete('/user/:id', (req, res) => {
    const id = req.params.id;
    const userIndex = users.find(user => user.id == id); 
  users.pop({...userIndex})
    fs.writeFile("./Data.json",(e,re)=>{
        if(e){
            console.log(e)
        }
        else{
            res.json({status:'success',userIndex})
        }
    })


});

app.listen(8000,()=>{
    console.log("server Started")
})



















// const express =require('express')
// const data=require('./DATA.json')
// const app=express()

// const user=data.map((c)=> c.first_name)
// app.get("/users",(req,res)=>{
//     res.send(user)
//     })

// app.get("/api/users",(req,res)=>{
//     res.json(data)
// })

// app.get("/api/users/:id",(req,res)=>{
//     const uid=req.params.id
//     const idData=data.find((data) => data.id==uid)
//     res.json(idData)
// })

// const port=8000
// app.listen(port,()=>{
//     console.log(`Server Started in Port : ${port}`)
// })

