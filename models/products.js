const mongoose=require("mongoose")
const Schema=mongoose.Schema
const BlogPost=new Schema({
    product_category:{type:String,required:true},
    product_price:{type:Number,required:true},
    product_band:{type:String,require:true},
    product_name:{type:String,required:true}
})
const productData=mongoose.model("Productsdata",BlogPost)
module.exports=productData;