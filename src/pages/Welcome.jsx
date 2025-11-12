import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/style.css";

const Welcome = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [username,setUsername] = useState("");

  useEffect(()=>{
    if(!isAuthenticated){
      navigate("/");
      return;
    }
    if(user?.username){
      setUsername(user.username);
    } else{
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUsername(storedUser?.username || "User");
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogout = useCallback(() => {
    logout();
    navigate("/");
  }, [logout, navigate]);

  const handleProfile = useCallback(() => {
    navigate("/profile");
  }, [navigate]);

// console.log("Welcome rendered", { isAuthenticated, user });

  return (
    <div className="welcome-container">
      <div className="top-right-toolbar">
        <button
          className="profile-btn"
          onClick={handleProfile}
          aria-label="Profile"
        >
          👤
        </button>
      </div>

      <h1>Welcome, {username}!</h1>
      <p>You’re logged in successfully 🎉</p>

      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default React.memo(Welcome);
