// src/App.js
import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import LandingPage from "./components/LandingPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to log out
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return isLoggedIn ? (
    <LandingPage onLogout={handleLogout} />
  ) : (
    <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />
  );
}

export default App;