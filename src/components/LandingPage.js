// src/components/LandingPage.js
import React, { useState } from "react";
import Tasks from "./Tasks";
import Quotes from "./Quotes";
import "./LandingPage.css"; // Import the CSS file for styling

function LandingPage({ onLogout }) {
  const [activeTab, setActiveTab] = useState("tasks");

  return (
    <div style={{ display: "flex" }}>
      {/* Left Menu */}
      <div className="menu-container">
        <button onClick={() => setActiveTab("tasks")}>Tasks</button>
        <button onClick={() => setActiveTab("quotes")}>Quotes</button>
        <button onClick={onLogout}>Logout</button> {/* Logout Button */}
      </div>

      {/* Right Panel */}
      <div style={{ width: "80%" }}>
        {activeTab === "tasks" ? <Tasks /> : <Quotes />}
      </div>
    </div>
  );
}

export default LandingPage;