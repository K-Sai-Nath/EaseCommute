import React, { useState } from "react";
import "../CSS/Details.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Details = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, username } = location.state || {};
  const [mobileNumber, setMobileNumber] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Generate default password
    const password = email.substring(0, 4) + username.substring(0, 4);
    const confirmPassword = password;

    try {
      // Send signup data to backend
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`,
        { username, mobileNumber, email, password, confirmPassword }
      );
      alert("SignUp Successful");

      // Store only username in localStorage for session
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);

      // Navigate to Action page
      navigate("/action");
    } catch (err) {
      console.log("Signup Failed", err);
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div className="Form">
      <input
        type="text"
        minLength="10"
        placeholder="Mobile Number"
        onChange={(e) => setMobileNumber(e.target.value)}
      />
      <button id="btn1" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Details;
