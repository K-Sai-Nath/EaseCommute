import axios from "axios"
import {useState} from "react"
import react from "react"
import logo from "./images/Logo.webp"
import "../CSS/Forgot.css"
import { useNavigate } from "react-router-dom"
const Forgot=()=>{
    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const handleReset= async (event)=>{
        event.preventDefault();
        try{
            const res=await axios.post("http://localhost:9000/api/auth/forgot_password",{email})
            console.log("Success",res);
            alert("Email sent");
        }
        catch(err){
            alert(err.response.data.message);
            console.log("There is an Error",err)
        }
    }
    return (
        <div className="Form">
            <div className="navbar">
                <img src={logo}></img>
            </div>
            <form>
                <div className="top">
                    <input type="email" placeholder="Email" onChange={(e)=>{
                    setEmail(e.target.value)
                    }}></input>
                </div>
                <div className="bottom">
                    <button id="forgot1" onClick={handleReset}>Reset Password</button>
                </div>
            </form>
        </div>
    )
}
export default Forgot