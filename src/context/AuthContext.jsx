import React, { createContext, useState, useEffect } from "react";
import api from "../api/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedAuth = localStorage.getItem("isAuthenticated") === "true";
    if (storedUser && storedAuth) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  // ✅ Login using mock API
  const login = async (username, password) => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get(`/users?username=${username}&password=${password}`);
      if (response.data.length > 0) {
        const userData = response.data[0];
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("isAuthenticated", "true");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Registration — adds user to db.json
  const register = async (username, password, email) => {
    setLoading(true);
    setError("");

    try {
      // Check if username already exists
      const exists = await api.get(`/users?username=${username}`);
      if (exists.data.length > 0) {
        setError("Username already exists");
        return;
      }

      const newUser = { username, password, email };
      const res = await api.post("/users", newUser);

      setUser(res.data);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("isAuthenticated", "true");
    } catch (err) {
      setError("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
