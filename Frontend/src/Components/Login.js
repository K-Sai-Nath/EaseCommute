import React from "react"
import {useState,useEffect} from "react"
import google from "./images/google.webp"
import axios from "axios"
import logo from "./images/Logo.webp"
import "../CSS/Login.css"
import { app } from "../Firebase"
import {GoogleAuthProvider, signInWithPopup ,getAuth} from "firebase/auth"
import { NavigationType, useNavigate } from "react-router-dom"
const Login=()=>{
    const auth=getAuth(app);
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()
    const handleForgotPassword=(event)=>{
        event.preventDefault()
        navigate("/forgot_password")
    }
    const handleGoogle= async (event)=>{
        event.preventDefault()
        const provider= new GoogleAuthProvider();
        provider.setCustomParameters({prompt:"select_account"})
        try{
            const resultsFromGoogle=await signInWithPopup(auth,provider)
            console.log(resultsFromGoogle)
            const email=resultsFromGoogle.user.email;
            const username=resultsFromGoogle.user.displayName;
            navigate('/details',{state:{email,username}})
        }
        catch(err){
            console.log(err)
        }
    }
    const handleImg=()=>{
        navigate('/')
    }
    const handleLogin= async (event)=>{
        event.preventDefault();
        try{
            const res=await axios.post("http://localhost:9000/api/auth/login",{email,password})
            const username=res.data.user.username;
            localStorage.setItem("isAuthenticated","true")
            navigate('/action',{state:{username}})
        }
        catch(err){
            console.log("Login Failed",err)
            alert("Invalid credentials or something went wrong.")
        }
    }
    const handleSignUp=()=>{
        navigate('/register')
    }
    return (
        <div className="Form">
            <div className="navbar">
                <img src={logo} onClick={handleImg}></img>
            </div>
            <form onSubmit={handleLogin}>
                <div className="top">
                    <input type="email" required="true" placeholder="Email"
                    onChange={(e)=>{
                    setEmail(e.target.value)
                    }}
                    >
                    </input>
                    <input type="password" required="true" placeholder="Password"
                    onChange={(e)=>{
                    setPassword(e.target.value)
                    }}
                    >
                    </input>
                    <button id="forgot" onClick={handleForgotPassword}>Forgot Password</button>
                    <button type="submit">Login</button>
                    </div>
                <div className="bottom">
                    <button className="button" onClick={handleGoogle}><img src={google}></img><p>Google</p></button>
                    <p>Doesn't have an Account <span onClick={handleSignUp}>SignUp</span></p>
                </div>
            </form>
        </div>
    );
}
export default Login;   