import React, { useState } from "react";
import axios from "axios";
import google from "./images/google.webp";
import logo from "./images/Logo.webp";
import "../CSS/Login.css";
import { app } from "../Firebase";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Normal email/password login
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
        { email, password }
      );

      const username = res.data.user.username;
      const emailFromServer = res.data.user.email;

      // Store in localStorage
      localStorage.setItem("username", username);
      localStorage.setItem("email", emailFromServer);
      localStorage.setItem("isAuthenticated", "true");

      navigate("/action"); // no need for state, we can read from localStorage
    } catch (err) {
      console.log("Login Failed", err);
      alert("Invalid credentials or something went wrong.");
    }
  };

  // Google login
  const handleGoogle = async (event) => {
    event.preventDefault();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const email = resultsFromGoogle.user.email;
      const username = resultsFromGoogle.user.displayName;

      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/google`,
        { email, username }
      );

      // Store in localStorage
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
      localStorage.setItem("isAuthenticated", "true");

      if (res.data.firstTime) {
        navigate("/details"); // details page can read from localStorage
      } else {
        alert("Welcome back!");
        navigate("/action");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();
    navigate("/forgot_password");
  };

  return (
    <div className="Form">
      <div className="navbar">
        <img src={logo} alt="logo" />
      </div>
      <form onSubmit={handleLogin}>
        <div className="top">
          <input
            type="email"
            required
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button id="forgot" onClick={handleForgotPassword}>
            Forgot Password
          </button>
          <button type="submit">Login</button>
        </div>
        <div className="bottom">
          <button className="button" onClick={handleGoogle}>
            <img src={google} alt="Google" />
            <p>Google</p>
          </button>
          <p>
            Doesn't have an Account <span onClick={handleSignUp}>SignUp</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
