import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";
import "../styles/style.css";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`/users/${user?.id}`, [user]);

  const userInfo = useMemo(() => {
    if (!data && !user) return null;
    return {
      name: data?.name || user?.username,
      email: data?.email || "user@example.com",
      username: user?.username,
    };
  }, [data, user]);

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-text">{error}</p>}
      {userInfo && (
        <div className="profile-details">
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Username:</strong> {userInfo.username}</p>
        </div>
      )}
      <button onClick={() => navigate("/welcome")} className="form-btn">
        Back
      </button>
    </div>
  );
};

export default Profile;
