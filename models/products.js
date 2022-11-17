const mongoose=require("mongoose")
const Schema=mongoose.Schema
const BlogPost=new Schema({
    category:{type:String,required:true},
    price:{type:Number,required:true},
    band:{type:String,require:true},
    name:{type:String,required:true}
})
const productData=mongoose.model("Productsdata",BlogPost)
module.exports=productData;