const User=require("../models/User");
const bcrypt=require("bcrypt");
const SignUp= async (req,res) => {
    const {username,mobileNumber,email,password,confirmPassword}=req.body;
    if (password!==confirmPassword){
        return res.status(400).json({error:"Passwords do not match"})
    }
    const existingUser=await User.findOne({email})
    if (existingUser){
        return res.status(400).json({error:"User already exists"})
    }
    const hashPassword= await bcrypt.hash(password,10);
    const newUser=new User({username,mobileNumber,email,password:hashPassword});
    await newUser.save();
    return res.status(200).json({message:"User Registration Successful"})
}
module.exports=SignUp; 