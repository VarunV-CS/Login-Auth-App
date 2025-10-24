import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

const Profile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username) {
      setUsername(user.username);
    } else {
      navigate("/"); // redirect if no user found
    }
  }, [navigate]);

  return (
    <div className="container">
      <h2>User Profile</h2>
      <p><strong>Username:</strong> {username}</p>

      <button onClick={() => navigate("/welcome")}>⬅ Back to Home</button>
    </div>
  );
};

export default Profile;
