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

  const login = async (username, password) => {
    try {
      setLoading(true);
      setError("");

      // Example login API (replace with real endpoint)
      const response = await api.post("/login", { username, password });

      // Simulated success (since JSONPlaceholder doesn’t support login)
      const userData = { id: 1, username };

      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isAuthenticated", "true");
    } catch (err) {
      setError("Invalid credentials or network error");
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
      value={{ user, isAuthenticated, loading, error, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
