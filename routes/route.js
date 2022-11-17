const express=require("express")
const users=require("../models/users")

const  jwt = require('jsonwebtoken');
const bcrypt=require("bcrypt")
const route=express.Router()
const secret="sugar"
module.exports=route
route.post("/login",async(req,res)=>{
    try{
        const finduser=await users.findOne({email:req.body.email})
        if(finduser==null){
            res.status(400).json({
                status:"error",
                message:"user is not registered"
            })
        }else{
            bcrypt.compare(req.body.password, finduser.password, async function(err, result) {
                // result == true
                if(err){
                    res.status(400).json({
                        status:"error",
                        message:err
                    })
                }else{
                    if(result){
                        const data=await users.findOne({email:req.body.email})
                        //tokens generated

                        const token=jwt.sign({
                            data: data._id
                          }, secret, { expiresIn: 60 * 60 });
                        //console.log(token)
                        res.status(200).json({
                            status:"sucess",
                            message:"user is autenticated",
                            token
                        })
                    }else{
                        res.status(400).json({
                            status:"error",
                            message:"password doesnt't match"
                        })

                    }
                }
            });
        }
        
    }catch{

    }



})
route.post("/register",async(req,res)=>{
    try{
        
        const finduser=await users.findOne({email:req.body.email})
        //checking user is existed or not
        if(finduser==null){
            try{
                
                bcrypt.hash(req.body.password, 10, async function(err, hash) {
                    // Store hash in your password DB.
                    if(err){
                        res.status(400).json({
                            status:"error",
                            message:err  
                        })
                    }else{
                        console.log(req.body)
                        await users.create({email:req.body.email,password:hash})
                        console.log("inside 2try")
                        res.status(200).json({
                            status:"sucess",
                            message:"user data created"
                            
                        })
                    }
                });  

            }
            catch(e){
                console.log("hii")
                res.status(400).json({
                    status:"error",
                    message:e.message
                })
            }

        }else{
            res.status(400).json({
                status:"error",
                message:"user already registered"
            })
        }

    }
    catch(e){
        
        res.status(400).json({
            status:"error",
            message:e.message
        })

    }

})


