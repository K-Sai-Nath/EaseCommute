import React from "react";
import { useState } from "react";
import { useLocation ,useNavigate} from "react-router-dom";
import logo from "./images/Logo.webp";
import "../CSS/Action.css"
const Action=()=>{
    const location=useLocation();
    const navigate=useNavigate();
    const {username}=location.state;
    const handleMain=()=>{
        navigate('/')
    }
    const handleOffer=()=>{
        navigate('/offer_trip',{state:{username}})
    }
    const handleAdd=()=>{
        navigate('/add_trip',{state:{username}})
    }
    return (
        <div class="overall">
            <div className="nav">
                <img src={logo} onClick={handleMain}></img>
                <p>{username}</p>
            </div>
            <div className="Form">
                <button className="button" onClick={handleOffer}>Offer Trip</button>
                <button className="button" onClick={handleAdd}>Add Trip</button>
            </div>
        </div>
    )
}
export default Action;