const route=require("./routes/route")
const express=require("express")
const bodyparse=require("body-parser")
const app=express()
app.use(bodyparse.json())
app.use("/",route)
const port=8080
app.listen(port,()=>console.log(`app is running at${port}`))