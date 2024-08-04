const userModels=require('../models/usersModels')

const userSingup=async(req,res)=>{
    const {name,email,password}=req.body;
   try {
    await userModels.create({
        name,
        email,
        password
    })
    return res.render("login")
   } catch (error) {
    res.status(501).json({Msg:'Eroor',error})

   }
}

const userSingIn=async(req,res)=>{
    const {email,password}= req.body;
    try {
        const result=await userModels.findOne({email,password})
        if(!result){
           return res.render('login',{
            error:'Invalid username and Password',
           })
        }
        return res.render('Home')
    } catch (error) {
        res.status(500).json({MSg:"eroor",error})
        console.log(error)
    }

}
module.exports={userSingup,userSingIn}