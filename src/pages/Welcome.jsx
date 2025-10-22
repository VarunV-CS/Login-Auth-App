import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

const Welcome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("You have been logged out.");
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Welcome Home!</h2>
      <p>You are successfully logged in.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Welcome;
