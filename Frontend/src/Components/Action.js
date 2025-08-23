import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./images/Logo.webp";
import "../CSS/Action.css";

const Action = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "User";

  const handleMain = () => {
    navigate("/");
  };

  const handleOffer = () => {
    navigate("/offer_trip");
  };

  const handleAdd = () => {
    navigate("/add_trip");
  };

  return (
    <div className="overall">
      <div className="nav">
        <img src={logo} onClick={handleMain} alt="Logo" />
        <p>{username}</p>
      </div>
      <div className="Form">
        <button className="button" onClick={handleOffer}>
          Offer Trip
        </button>
        <button className="button" onClick={handleAdd}>
          Add Trip
        </button>
      </div>
    </div>
  );
};

export default Action;
