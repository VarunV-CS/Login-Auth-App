import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/style.css";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p><strong>Username:</strong> {user?.username}</p>
      <button onClick={() => navigate("/welcome")} className="form-btn">
        Back to Welcome
      </button>
    </div>
  );
};

export default Profile;
