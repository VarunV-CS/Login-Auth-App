import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/style.css";

const Welcome = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="welcome-container">
      <div className="top-right-toolbar">
        <button
          className="profile-btn"
          onClick={() => navigate("/profile")}
          aria-label="Profile"
        >
          👤
        </button>
      </div>

      <h1>Welcome, {user?.username || "User"}!</h1>
      <p>You’re logged in successfully 🎉</p>

      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Welcome;
