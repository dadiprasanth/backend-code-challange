const express=require("express")
const users=require("../models/users")
const products=require("../models/products")
const admin=require("../models/admin")
const  jwt = require('jsonwebtoken');
const bcrypt=require("bcrypt")
const route=express.Router()
const secret="sugar"
module.exports=route
route.post("/login",async(req,res)=>{
    console.log(req.body)
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
route.get("/login/products",async(req,res)=>{
    try{
        console.log(req.headers.authorization)
        jwt.verify(req.headers.authorization, secret, async function(err, decoded) {
            if(err){
                res.status(400).json({
                    status:"error",
                    message:"token is not provided"
                })

            }else{
                console.log(decoded.data) // bar
                const checkUser=await users.findOne({_id:decoded.data})
                if(checkUser){
                    const data=await products.find()
                    res.status(200).json({
                        status:"sucess",
                        data
                    })

                }else{
                    res.status(400).json({
                        status:"error",
                        message:"token is not valid"
                    })
                }

            }
            
          });

    }catch(e){
        res.status(400).json({
            status:"error",
            message:e
        })
    }

})
route.post("/login/products",async(req,res)=>{
    try{
        console.log(req.headers.authorization)
        jwt.verify(req.headers.authorization, secret, async function(err, decoded) {
            if(err){
                res.status(400).json({
                    status:"error",
                    message:"token is not provided"
                })

            }else{
                console.log(decoded.data) // bar
                const checkUser=await users.findOne({_id:decoded.data})
                if(checkUser){
                    const data=await products.create(req.body)
                    res.status(200).json({
                        status:"sucess",
                        data
                    })

                }else{
                    res.status(400).json({
                        status:"error",
                        message:"token is not valid"
                    })
                }

            }
            
          });

    }catch(e){
        res.status(400).json({
            status:"error",
            message:e
        })
    }

})
route.put("/login/products/:id",async(req,res)=>{
    try{
        console.log(req.headers.authorization)
        jwt.verify(req.headers.authorization, secret, async function(err, decoded) {
            if(err){
                res.status(400).json({
                    status:"error",
                    message:"token is not provided"
                })

            }else{
                console.log(decoded.data) // bar
                const checkUser=await users.findOne({_id:decoded.data})
                if(checkUser){
                    const data=await products.updateOne({_id:req.params.id},req.body)
                    res.status(200).json({
                        status:"sucess",
                        message:"data updated"
                    })

                }else{
                    res.status(400).json({
                        status:"error",
                        message:"token is not valid"
                    })
                }

            }
            
          });

    }catch(e){
        res.status(400).json({
            status:"error",
            message:e
        })
    }

})
route.delete("/login/products/:id",async(req,res)=>{
    try{
        console.log(req.headers.authorization)
        jwt.verify(req.headers.authorization, secret, async function(err, decoded) {
            if(err){
                res.status(400).json({
                    status:"error",
                    message:"token is not provided"
                })

            }else{
                console.log(decoded.data) // bar
                const checkUser=await users.findOne({_id:decoded.data})
                if(checkUser){
                    const data=await products.deleteOne({_id:req.params.id})
                    res.status(200).json({
                        status:"sucess",
                        message:"data deleted"
                    })

                }else{
                    res.status(400).json({
                        status:"error",
                        message:"token is not valid"
                    })
                }

            }
            
          });

    }catch(e){
        res.status(400).json({
            status:"error",
            message:e
        })
    }

})
route.get("/login/customers",async(req,res)=>{
    try{
        console.log(req.headers.authorization)
        jwt.verify(req.headers.authorization, secret, async function(err, decoded) {
            if(err){
                res.status(400).json({
                    status:"error",
                    message:"token is not provided"
                })

            }else{
                console.log(decoded.data) // bar
                const checkUser=await users.findOne({_id:decoded.data})
                const isAdmin=await admin.findOne({email:checkUser.email})
                if(isAdmin){
                    const data=await users.find()
                    res.status(200).json({
                        status:"status",
                        data
                    })

                }else{
                    res.status(400).json({
                        status:"error",
                        message:"He is not admin"
                    })
                }

            }
            
          });

    }catch(e){
        res.status(400).json({
            status:"error",
            message:e
        })
    }

})




