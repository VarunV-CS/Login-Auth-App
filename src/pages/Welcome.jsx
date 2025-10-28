import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Welcome = React.memo(() => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleProfile = useCallback(() => navigate("/profile"), [navigate]);
  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  return (
    <div className="welcome-container">
      <div className="top-right-toolbar">
        <button className="profile-btn" onClick={handleProfile}>👤</button>
      </div>
      <h1>Welcome, {user?.username || "Guest"}!</h1>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
});

export default Welcome;
