const mongoose = require('mongoose');
const { Schema } = mongoose;

//schema 
const productSchema = new Schema({
    title:{type:String, required:true, unique:true},
    description: String,
    price: {type:Number,min:[0,'wrong price']},
    discountPercentage: {type:Number,min:[0,'min not disco'], max:[100,'wrong max disco']},
    rating: {type:Number,min:[0,'min not rating'], max:[5,'wrong max rationg']},
    brand:String,
    category:String,
    thumbnail:{type:String, required:true},
    images:[ String ]
  });

exports.Product = mongoose.model('Product', productSchema);
