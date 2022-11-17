const mongoose=require("mongoose")
const Schema=mongoose.Schema
const BlogPost=new Schema({
    email:{type:String,required:true,unique:true},
    password:{trpe:String,required:true}
})
const userdata=mongoose.model("userdata",BlogPost)
module.exports=userdata