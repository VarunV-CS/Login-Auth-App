import React, { createContext, useState, useEffect, useCallback, useMemo } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  const [loading, setLoading] = useState(false);

  //  REGISTER
  const register = useCallback(async (username, password) => {
    setLoading(true);
    try {
      // Check if username already exists
      const existing = await fetch(`http://localhost:5000/users?username=${username}`);
      const exists = await existing.json();

      if (exists.length > 0) throw new Error("Username already exists");

      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Failed to register user");

      const newUser = await res.json();
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(newUser));
    } catch (error) {
      console.error("Register error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  //  LOGIN
  const login = useCallback(async (username, password) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/users?username=${username}&password=${password}`
      );

      const data = await res.json();

      if (data.length === 0) throw new Error("Invalid credentials");

      setUser(data[0]);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(data[0]));
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated, loading, login, register, logout }),
    [user, isAuthenticated, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
