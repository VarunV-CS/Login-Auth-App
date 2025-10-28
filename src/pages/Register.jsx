import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { useAuth } from "../hooks/useAuth";
import "../styles/style.css";

const Register = () => {
  const { register, isAuthenticated, loading, error } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) navigate("/welcome");
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(username, password, email);
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <InputField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="form-btn" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {error && <p className="error-text">{error}</p>}

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
