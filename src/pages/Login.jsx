import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import "../styles/style.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && username === storedUser.username && password === storedUser.password) {
      alert("Login successful!");
      navigate("/welcome");
    } else {
      alert("Invalid username or password!");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <InputField type="text" placeholder="Username" value={username} onChange={setUsername} />
      <InputField type="password" placeholder="Password" value={password} onChange={setPassword} />
      <button onClick={handleLogin}>Login</button>
      <Link to="/register">Don't have an account? Register</Link>
    </div>
  );
};

export default Login;
