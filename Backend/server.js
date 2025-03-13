const express=require("express");
const mongoose=require("mongoose");
const authRoutes=require("./routes/AuthRoutes")
const app=express();
const cors=require('cors');
app.use(cors());
app.use(express.json())
app.use("/api/auth",authRoutes);
mongoose.connect("mongodb://localhost:27017/Users",{useNewUrlParser:true,useUnifiedTopology: true })
.then(()=>{
    console.log("DB Connected");
})
.catch((err)=>{
    console.log(err);
})
app.listen(9000,()=>{
    console.log("Server Started");
})