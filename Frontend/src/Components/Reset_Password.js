import React, { useState } from "react";
import "../CSS/Reset_Password.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Reset_Password = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const { id, token } = useParams();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password != confirmPassword) {
      alert("Password and Confirm Password do not match");
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/reset_password/${id}/${token}`,
        { password }
      );
      alert("Password changed successfully");
      navigate("/login");
    } catch (err) {
      console.log("Error", err);
    }
  };
  return (
    <div className="Form">
      <input
        type="password"
        required="true"
        minLength="8"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></input>
      <input
        type="password"
        required="true"
        minLength="8"
        placeholder="Confirm Password"
        onChange={(e) => {
          setconfirmPassword(e.target.value);
        }}
      ></input>
      <button id="btn1" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};
export default Reset_Password;
