const mongoose=require("mongoose")
const Schema=mongoose.Schema
const BlogPost=new Schema({
    email:{type:String,required:true,unique:true},
  
})
const adminData=mongoose.model("adminData",BlogPost)
module.exports=adminData;