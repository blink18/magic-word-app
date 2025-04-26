// src/components/LandingPage.js
import React, { useState } from "react";
import Tasks from "./Tasks";
import Quotes from "./Quotes";
import WelcomePage from "./WelcomePage";
import "../assets/styles.css";
import { faLock, faHouse, faListCheck, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function LandingPage({ onLogout }) {
  const [activeTab, setActiveTab] = useState("welcome");

  return (
    <div className="landing-container">
      {/* Left Menu */}
      <div className="menu-container">
        <button className="landing-page-button" onClick={() => setActiveTab("welcome")}>Home  <FontAwesomeIcon icon={faHouse} /></button>
        <button className="landing-page-button" onClick={() => setActiveTab("tasks")}>Tasks  <FontAwesomeIcon icon={faListCheck} /></button>
        <button className="landing-page-button" onClick={() => setActiveTab("quotes")}>Quotes  <FontAwesomeIcon icon={faFile} /></button>
        <button className="landing-page-button logout" onClick={onLogout} style={{ marginTop: "auto" }}> Logout <FontAwesomeIcon icon={faLock} /> </button>
      </div>

      {/* Right Panel */}
      <div className="display-container">
        {activeTab === "welcome" ? <WelcomePage /> : activeTab === "tasks" ? <Tasks /> : <Quotes />}
      </div>
    </div>
  );
}

export default LandingPage;