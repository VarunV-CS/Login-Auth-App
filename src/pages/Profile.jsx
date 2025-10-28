import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";

const Profile = React.memo(() => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
    user ? `http://localhost:3000/users/${user.username}` : null
  );

  const handleBack = useCallback(() => navigate("/welcome"), [navigate]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="profile-container">
      <h2>Profile Page</h2>
      <p><strong>Username:</strong> {data?.username || user?.username}</p>
      <button onClick={handleBack}>Back to Welcome</button>
    </div>
  );
});

export default Profile;
