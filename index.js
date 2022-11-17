
const express=require("express")
const bodyparse=require("body-parser")
const route=require("./routes/route")
const { default: mongoose } = require("mongoose")
const app=express()
app.use(bodyparse.json())
app.use("/",route)
mongoose.connect("mongodb://localhost/challangebackend")
const port=8080
app.listen(port,()=>console.log(`app is running at${port}`))  