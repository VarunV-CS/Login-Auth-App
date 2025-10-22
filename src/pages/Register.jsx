import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import "../styles/style.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!username || !password) {
      alert("Please fill all fields!");
      return;
    }
    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    const user = { username, password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Registration successful! Please login.");
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <InputField type="text" placeholder="Username" value={username} onChange={setUsername} />
      <InputField type="password" placeholder="Password" value={password} onChange={setPassword} />
      <InputField type="password" placeholder="Confirm Password" value={confirm} onChange={setConfirm} />
      <button onClick={handleRegister}>Sign Up</button>
      <Link to="/">Already have an account? Login</Link>
    </div>
  );
};

export default Register;
