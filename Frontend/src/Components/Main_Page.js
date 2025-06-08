import React from "react";
import logo from "./images/Logo.webp"
import Main_page from "../CSS/Main_Page.css"
import {useNavigate} from "react-router-dom"
const Main_Page=()=>{
    const navigate=useNavigate();
    const handleClick=()=>{
        navigate('/login')
    }
    const handleMain=()=>{
        navigate('/')
    }
    return (
    <div className="main">
        <div className="left">
            <img src={logo} onClick={handleMain}></img>
        </div>
        <div className="right">
            <p>Join EaseCommute today and turn your daily rides into cost-saving, eco-friendly journeys! Experience hassle-free carpooling with secure and reliable connections, all while reducing your transportation costs. By sharing rides, you'll help decrease traffic congestion, reduce your carbon footprint, and contribute to a cleaner, greener environment. With EaseCommute, you can enjoy a flexible, convenient way to travel, whether for work, errands, or leisure.Our platform ensures safety and security, with verified profiles and real-time tracking, giving you peace of mind with every ride.</p>
            <button onClick={handleClick}>Try it Now</button>
        </div>
    </div>
)
}
export default Main_Page