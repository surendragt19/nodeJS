const fs=require('fs')
const data=JSON.parse(fs.readFileSync('data.json','utf-8'))  
const products=data.products;

//Callback of CRUD
exports.create=(req,res)=>{
    console.log(req.body)
    products.push(req.body)
    res.status(201).json(req.body)
}
exports.readAll=(req,res)=>{
    res.json(products)
}

exports.read=(req,res)=>{
    const Id=+req.params.id    
    const pro=products.find(p=>p.id=Id)
    res.json(pro)
}
exports.replace=(req,res)=>{
    const Id=+req.params.id  
    const proIndex=products.findIndex(p=>p.id=Id)
    products.splice(proIndex,1,{...req.body,id:Id})
    res.status(201).json()
}
exports.update=(req,res)=>{
    const Id=+req.params.id  
    const proIndex=products.findIndex(p=>p.id=Id)
    const oldP_Data=products[proIndex]
    products.splice(proIndex,1,{...oldP_Data,...req.body})
    res.status(201).json()
}
exports.remove=(req,res)=>{
    const Id=+req.params.id  
    const proIndex=products.findIndex(p=>p.id=Id)
    const oldP_Data=products[proIndex]  
    products.splice(proIndex,1)
    res.status(201).json(oldP_Data)
}