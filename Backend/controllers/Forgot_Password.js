const User=require("../models/User")
const jwt=require("jsonwebtoken")
const nodemailer=require("nodemailer")
const Forgot_Password= async (req,res)=>{
    const {email}=req.body;
    const user=await User.findOne({email})
    if(!user){
        return res.status(400).json({message:"User not Found"})
    }
    const token=jwt.sign({id:user.id},"jwt_secret_key",{expiresIn:"15m"})
    const resetLink=`http://localhost:3000/reset_password/${user.id}/${token}`
    const transporter =nodemailer.createTransport({
        service:"gmail",
        auth: {
            user:"risrithreddy9704319026@gmail.com", 
            pass:"iyzk hoxz ywin knuw",  
        },
    });

    const mailOptions = {
        from: "risrithreddy9704319026@gmail.com",
        to: email,
        subject: "Password Reset",
        html: `<p>Click the link below to reset your password:</p>
               <a href="${resetLink}">${resetLink}</a>
               <p>This link is valid for 15 minutes.</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Password reset link sent to email." });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Error sending email." });
    }
};
module.exports=Forgot_Password;