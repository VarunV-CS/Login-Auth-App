import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { useAuth } from "../hooks/useAuth";
import "../styles/style.css";

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading, error } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) navigate("/welcome");
  }, [isAuthenticated, navigate]);

  const handleUsernameChange = useCallback((e) => setUsername(e.target.value), []);
  const handlePasswordChange = useCallback((e) => setPassword(e.target.value), []);
  const handleLogin = useCallback(
    async (e) => {
    e.preventDefault();
    await login(username, password);
  },
  [username, password, login]);

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <InputField
          label="Username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button type="submit" className="form-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <p className="error-text">{error}</p>}
      <p>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
