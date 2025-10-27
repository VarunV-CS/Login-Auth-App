import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import InputField from "../components/InputField";
import "../styles/style.css";

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) navigate("/welcome");
  }, [isAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (
      storedUser &&
      storedUser.username === username &&
      storedUser.password === password
    ) {
      login(storedUser);
      alert("Login successful!");
      navigate("/welcome");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit" className="form-btn">Login</button>
      </form>
      <p>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
