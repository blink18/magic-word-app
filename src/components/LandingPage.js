// src/components/LandingPage.js
import React, { useState } from "react";
import Tasks from "./Tasks";
import Quotes from "./Quotes";
import WelcomePage from "./WelcomePage";
import "../assets/styles.css"; // Updated to use the new location of the consolidated CSS file

function LandingPage({ onLogout }) {
  const [activeTab, setActiveTab] = useState("welcome");

  return (
    <div style={{ display: "flex" }}>
      {/* Left Menu */}
      <div className="menu-container">
        <button className="landing-page-button" onClick={() => setActiveTab("welcome")}>Home</button>
        <button className="landing-page-button" onClick={() => setActiveTab("tasks")}>Tasks</button>
        <button className="landing-page-button" onClick={() => setActiveTab("quotes")}>Quotes</button>
        <button className="landing-page-button logout" onClick={onLogout}>Logout</button> {/* Logout Button */}
      </div>

      {/* Right Panel */}
      <div style={{ width: "80%" }}>
        {activeTab === "welcome" ? <WelcomePage /> : activeTab === "tasks" ? <Tasks /> : <Quotes />}
      </div>
    </div>
  );
}

export default LandingPage;