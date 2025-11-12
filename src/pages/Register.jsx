import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { useAuth } from "../hooks/useAuth";
import "../styles/style.css";

const Register = () => {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(
     async (e) => {
    e.preventDefault();
    await register(username, password, email);
    if (!error) {
      setSuccess(true);
      setTimeout(() => navigate("/"), 1500); // redirect after success
    }
  },
  [username, password, email, register, error, navigate]
);

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
      {success && <p className="success-text">Registered successfully! Redirecting...</p>}

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
