const express=require('express')
const path=require('path')
const connectDB=require('./config/db')
const empRouter=require('./routes/userRoutes')
const empModels=require('./models/userModels')
const app=express()

//middlewear 
app.use(express.urlencoded({extended:true}))
app.use(express.json())


//routes
app.use('/emp',empRouter)

//template engine
app.set('view engine','ejs')
app.set('views',path.resolve("./views"))


// Route to render employee data 
app.get('/allEmp', async (req, res) => {
    try {
        const result = await empModels.find({});
        res.render('Home', { employees: result });
    } catch (error) {
        res.status(501).json({ status: 'Server Error', error });
    }
});
//for render
app.get('/form', (req, res) => {
    res.render('Form');
});
//send data
app.post('/form', async (req, res) => {
    try {
        const { name, email, address, job } = req.body;
        const newEmployee = new empModels({ name, email, address, job });
        await newEmployee.save();
        res.redirect('/allEmp');
    } catch (error) {
        res.status(501).json({ status: 'Server Error', error });
    }
});


//connetion
connectDB('mongodb://127.0.0.1:27017/mvc')
.then(()=>console.log("Databse connect"))
.catch(()=>console.log("Connection Faield"))

//server
app.listen(8000,()=>{
    console.log("Server Started")
})