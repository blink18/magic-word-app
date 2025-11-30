// src/components/LoginPage.js
import React, { useState, useEffect } from "react";
import "../assets/styles.css"; // Updated to use the new location of the consolidated CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';

function LoginPage({ onLoginSuccess }) {
  const [textboxValue, setTextboxValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(" ");

  useEffect(() => {
    setTextboxValue("Enter codeword"); // Set default value after the page loads
}, []); 

  const handleLogin = () => {
    if (textboxValue.trim().toLowerCase() === "open sesame") {
      onLoginSuccess();
    } else {
      setErrorMessage("No Deal");
      setTimeout(() => setErrorMessage(" "), 2500); // Clear message after 10s
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h4>Say the Magic Word</h4>
        <input
          type="text"
          value={textboxValue}
          onChange={(e) => setTextboxValue(e.target.value)} // Allow changing the value
          onFocus={(e) => {
            if (e.target.value === "Enter codeword") {
              setTextboxValue("");
            }
          }}
          placeholder="Enter text"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleLogin();
            }
          }}
        />
        <button className="letmein-button" onClick={handleLogin}>
          Let me in  <FontAwesomeIcon icon={faKey} />
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default LoginPage;