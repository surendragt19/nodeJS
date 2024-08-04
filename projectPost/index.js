const express = require('express')
const app = express()
const port = 3000
const path=require('path')
const userModel=require('./models/user.model')
const postModel=require('./models/post.models')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')

//ejs 
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,'public')))

//middlewar
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.render('register')
})

//register
app.post('/register',(req,res)=>{
    let {name,email,password,age,username}=req.body;
        
    const saltRound=12
    bcrypt.hash(password,saltRound,async(err,hash)=>{

         let users=await userModel.findOne({email})
         if(users){
        return res.send("User already Exist")
        }
        const createUser=await userModel.create({
            name,
            email,
            password:hash,
            age,
            username
        })
        let playload={
            email:createUser.email,
            id:createUser._id
        }
        const scKey="MEGHNA"
        const tokken=jwt.sign(playload,scKey)
        res.cookie("token",tokken)
        res.redirect("/login")
    })
})

//login

app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    const users=await userModel.findOne({email})
    if(!users){
        res.send("Somting Wrong")
    }
    let passMatch=await bcrypt.compare(password,users.password)
    if(passMatch){
        let playload={
            email:users.email,
            id:users._id
        }
        const scKey="MEGHNA"
        const tokken=jwt.sign(playload,scKey)
        res.cookie("token",tokken)
        res.redirect('/profile')
    }
    else{
        res.send('Somting Wrong pass')
    }
})



//logout

app.get('/logout',(req,res)=>{
    res.cookie("token","")
    res.redirect('/login')
})


//protected route

function isLogin(req,res,next){
    if(req.cookies.token==="") res.send("You are not login")
    else{
let data=jwt.verify(req.cookies.token,"MEGHNA")
req.user=data
next()
    }
}

// app.get('/profile',isLogin,(req,res)=>{
//     console.log(req.user)
//     res.render('profile')
// })


app.get('/profile',isLogin,async(req,res)=>{
    let userS=await userModel.findOne({email:req.user.email})

    //not object id want post 
    let newuser=await userS.populate("post")
    // console.log('User Posts:', newuser);
    res.render('profile',{userS})
})


//crete post
app.post('/post', isLogin, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const { content } = req.body;
        const newPost = await postModel.create({
            content,
            user: user._id
        });
        // Initialize posts array if it doesn't exist
        if (!user.posts) {
            user.posts = [];
        }
        user.post.push(newPost._id);
        await user.save();
        res.redirect('/profile'); 
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while creating the post');
    }
});
//like
app.get('/like/:id',isLogin,async(req,res)=>{
    let post=await postModel.findOne({_id:req.params.id}).populate("user")
    if(post.likes.indexOf(req.user._id)=== -1){
        post.likes.push(req.user.userid)
    }
    else{
        post.likes.splice(post.likes.indexOf(req.user.userid),1)
    }
    await post.save()
    res.redirect('/profile')
})


//update
app.get('/edit/:id',isLogin,async(req,res)=>{
    let postD=await postModel.find({_id:req.params.id}).populate("user")
    console.log(postD)
    res.render('edit',{postD})
})

app.post('/updatePost/:id', isLogin, async (req, res) => {
    try {
        const postId = req.params.id;
        const updatedContent = req.body.content;
        await postModel.findByIdAndUpdate(postId, { content: updatedContent });

        res.redirect('/profile');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

//delete post
app.get('/delete/:id', async (req, res) => {
    try {
      const postId = req.params.id;
      const deletedPost = await postModel.findByIdAndDelete(postId);
      if (!deletedPost) {
        return res.status(404).send("Post not found");
      }
      res.redirect('/profile');
    } catch (err) {
      console.error("Error deleting post:", err);
      res.status(500).send("Server error");
    }
  });
app.listen(port, () => console.log(`Example app listening on port ${port}!`))