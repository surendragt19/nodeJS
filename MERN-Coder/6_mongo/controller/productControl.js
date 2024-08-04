const fs=require('fs')
const model=require('../model/productS')
const Product=model.Product;



//CRUD
//Create
exports.create = async (req, res) => {
    try {
        const product = new Product(req.body);
        const doc = await product.save();
        console.log({ err: null, doc });
        res.status(201).json(doc);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};


//send hardCode Data
// exports.create=async (req,res)=>{
//     const product=new Product()
//     product.title='Phone';
//     product.price=9876;
//     product.rating=5;
//     await product.save();
//     res.status(201).json(req.body)
//     console.log(product)
// }



// Read
exports.readAll=async (req,res)=>{
    const products=await Product.find();
    res.json(products)
}

//Read by filter
exports.readAll=async (req,res)=>{
    const products=await Product.find({'rating':{$gt:4.5}});
    res.json(products)
}

//get one product
exports.read=async (req,res)=>{
    const Id=req.params.id    
    const products=await Product.findById(Id);
    res.json(products)
}


//replace ->put
exports.replace=async (req,res)=>{
    const Id=req.params.id  
    const replaceData=await Product.findOneAndReplace({_id:Id},req.body,{new:true})
    try {
        res.status(201).json(replaceData)
        
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

//update  ->patch
exports.update= async(req,res)=>{
    const Id=req.params.id  
    const updateData=await Product.findOneAndUpdate({_id:Id},req.body,{new:true})
    try {
        res.status(201).json(updateData) 
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}


//Delete
exports.remove=async(req,res)=>{
    const Id=req.params.id  
    const deleteData=await Product.findOneAndDelete({_id:Id},req.body,{new:true})
    try {
        res.status(201).json(deleteData) 
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}