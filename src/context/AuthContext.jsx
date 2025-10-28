import React, { createContext, useState, useEffect } from "react";
import api from "../api/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //  Load stored auth on app start
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedAuth = localStorage.getItem("isAuthenticated") === "true";
    if (storedUser && storedAuth) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  //  LOGIN
  const login = async (username, password) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/users?username=${username}&password=${password}`);
      if (res.data.length > 0) {
        const loggedInUser = res.data[0];
        setUser(loggedInUser);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        localStorage.setItem("isAuthenticated", "true");
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // REGISTER (doesn't auto login)
  const register = async (username, password, email) => {
    setLoading(true);
    setError("");
    try {
      const existingUser = await api.get(`/users?username=${username}`);
      if (existingUser.data.length > 0) {
        setError("Username already exists.");
        setLoading(false);
        return;
      }

      await api.post("/users", { username, password, email });
      // confirms registration success
    } catch (err) {
      setError("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  //Logout
  const logout = () => {
    localStorage.clear(); // Clears all user data
    setUser(null);
    setIsAuthenticated(false);
    setError("");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
