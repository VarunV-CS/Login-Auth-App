import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

const Welcome = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated || isAuthenticated !== "true") {
      navigate("/");
    } else {
      setUsername(storedUser?.username || "User");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <div className="welcome-container">
      {/* Top right: Profile button only */}
      <div className="top-right-toolbar">
        <button
          className="profile-btn"
          onClick={() => navigate("/profile")}
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

export default Welcome;
