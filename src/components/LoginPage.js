// src/components/LoginPage.js
import React, { useState } from "react";
import "./LoginPage.css"; // Import the CSS file for styling

function LoginPage({ onLoginSuccess }) {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(" ");

  const handleLogin = () => {
    if (inputValue.trim().toLowerCase() === "open sesame") {
      onLoginSuccess();
    } else {
      setErrorMessage("No Deal");
      setTimeout(() => setErrorMessage(" "), 5000); // Clear message after 10s
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h4>Say the Magic Word</h4>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Say the magic word"
        />
        <button onClick={handleLogin}>Let me in</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default LoginPage;