import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";
import "../styles/style.css";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, loading, error } = useFetch(`/users/${user?.id}`, [user]);

  return (
    <div className="profile-container">
      <h2>Profile</h2>

      {loading && <p>Loading profile...</p>}
      {error && <p className="error-text">{error}</p>}

      {data && (
        <div className="profile-details">
          <p><strong>Name:</strong> {data.name || user.username}</p>
          <p><strong>Email:</strong> {data.email || "user@example.com"}</p>
          <p><strong>Username:</strong> {user.username}</p>
        </div>
      )}

      <button onClick={() => navigate("/welcome")} className="form-btn">
        Back to Welcome
      </button>
    </div>
  );
};

export default Profile;
