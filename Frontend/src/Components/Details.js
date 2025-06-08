import react,{useState} from "react";
import "../CSS/Details.css"
import axios from "axios";
import { useLocation } from "react-router-dom";
const Details=()=>{
    const location=useLocation();
    const {email,username}=location.state || {}
    const [mobileNumber,setMobileNumber]=useState();
    const handelSubmit=async (event)=>{
        event.preventDefault();
        console.log(email,username);
        const password=(email.substring(0,4)+username.substring(0,4))
        const confirmPassword=password
        try{
            const res=await axios.post("http://localhost:9000/api/auth/signup",{username,mobileNumber,email,password,confirmPassword})
            alert("SignUp Successful")
        }
        catch(err){
            console.log("Failed",err)
        }
    }
    return (
        <div className="Form">
            <input type="text" minLength="10" placeholder="Mobile Number" onChange={(e)=>{
                setMobileNumber(e.target.value)
            }}></input>
            <button id="btn1" onClick={handelSubmit}>Submit</button>
        </div>
    )
}
export default Details