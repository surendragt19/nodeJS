const fs=require('fs')
const data=JSON.parse(fs.readFileSync('data.json','utf-8'))  
const users=data.users;

//Callback of CRUD
exports.create=(req,res)=>{
    console.log(req.body)
    users.push(req.body)
    res.status(201).json(req.body)
}
exports.readAll=(req,res)=>{
    res.json(users)
}
exports.read=(req,res)=>{

    const Id=+req.params.id    
    const pro=users.find(p=>p.id=Id)
    res.json(pro)
}
exports.replace=(req,res)=>{
    const Id=+req.params.id  
    const proIndex=users.findIndex(p=>p.id=Id)
    users.splice(proIndex,1,{...req.body,id:Id})
    res.status(201).json()
}
exports.update=(req,res)=>{
    const Id=+req.params.id  
    const proIndex=users.findIndex(p=>p.id=Id)
    const oldP_Data=users[proIndex]
    users.splice(proIndex,1,{...oldP_Data,...req.body})
    res.status(201).json()
}
exports.remove=(req,res)=>{
    const Id=+req.params.id  
    const proIndex=users.findIndex(p=>p.id=Id)
    const oldP_Data=users[proIndex]  
    users.splice(proIndex,1)
    res.status(201).json(oldP_Data)
}