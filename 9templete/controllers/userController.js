const empModels=require('../models/userModels')
const handleEmpCreate=async(req,res)=>{
   const {name,job,address,email}=req.body;
   try {
    const empData=await empModels.create({
        name:name,
        job:job,
        address:address,
        email:email,
    })
    res.status(201).json({Status:'Emp Created',empData})
   } catch (error) {
    res.status(501).json({statuus:'Server Error'},error)
   }
}

const haldleEmpGet=async(req,res)=>{
    try {
        const result=await empModels.find({})
    if(!result){
        res.status(401).json({msg:'Emp not found'})
    }
    res.status(200).json({status:'All Emp List',result})
    } catch (error) {
        res.status(501).json({statuus:'Server Error'},error)
    }
}




module.exports={handleEmpCreate,haldleEmpGet}