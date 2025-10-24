import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import Profile from "./pages/Profile";
import PrivateRoute from "./routes/PrivateRoute";
import ThemeToggle from "./components/ThemeToggle";

const App = () => {
  return (
    <Router>
      {/* Theme Toggle visible globally */}
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
