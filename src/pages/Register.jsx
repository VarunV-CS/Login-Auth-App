import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import InputField from "../components/InputField";
import "../styles/style.css";

const Register = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) navigate("/welcome");
  }, [isAuthenticated, navigate]);

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = { username, password };
    localStorage.setItem("user", JSON.stringify(newUser));
    alert("Registration successful! You can now log in.");
    navigate("/");
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <InputField
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="form-btn">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default Register;
