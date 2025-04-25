import React, { useState, useEffect } from "react";
import config from "../config";
import "../assets/styles.css";
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function WelcomePage() {
    const [location, setLocation] = useState(localStorage.getItem("weatherLocation") || "iata:HYD");
    const [weather, setWeather] = useState(null);
    const [ipResponse, setIpResponse] = useState(null);
    const [locationResponse, setLocationResponse] = useState(null);

    const fetchWeather = async () => {
        try {
            console.log("Location being passed to fetchWeather:", location);
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?q=${location}&key=${config.weatherApiKey}`);
            const data = await response.json();
            setWeather(data);
            localStorage.setItem("weatherLocation", location);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const fetchLocationFromIP = async () => {
        try {
            const ipResponse = await fetch("https://us1.api-bdc.net/data/client-ip");
            const ipData = await ipResponse.json();
            setIpResponse(ipData);

            const locationResponse = await fetch(`https://ipapi.co/${ipData.ipString}/json/`);
            const locationData = await locationResponse.json();
            setLocationResponse(locationData);

            return locationData.city || "iata:HYD"; // Fallback to "iata:HYD" if city is unavailable
        } catch (error) {
            console.error("Error fetching location from IP:", error);
            return "iata:HYD"; // Fallback in case of error
        }
    };

    useEffect(() => {
        let isInitialized = false; // Flag to ensure initialization happens only once

        const initializeLocationAndWeather = async () => {
            if (!isInitialized) {
                isInitialized = true;
                const detectedLocation = await fetchLocationFromIP();
                if (!location || location.trim() === "") {
                    setLocation(detectedLocation); 
                }
                await fetchWeather();
            }
        };

        initializeLocationAndWeather();

        return () => {
            isInitialized = false; // Cleanup flag on unmount
        };
    }, [location]); // Added location as a dependency to handle changes

    const CollapsiblePanel = ({ title, content }) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div>
                <div
                    style={{ cursor: "pointer", fontWeight: "bold", marginBottom: "5px" }}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? "▼" : "▶"} {title}
                </div>
                {isOpen && <pre style={{ marginLeft: "20px" }}>{content}</pre>}
            </div>
        );
    };

    return (
        <div className="welcome-container">
            {/* Weather Panel */}
            <div className="weather-panel">
                <h2>Weather Information</h2>
                {weather && (
                    <div className="weather-result">
                        <p><strong>Location:</strong> {weather.location.name}</p>
                        <p><strong>Temperature:</strong> {weather.current.temp_c}°C</p>
                        <p><strong>Condition:</strong> {weather.current.condition.text}</p>
                    </div>
                )}
                <div className="input-button-container">
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter location"
                    />
                    <button onClick={fetchWeather}>
                        Get Weather  <FontAwesomeIcon icon={faCloudSun} />
                    </button>
                </div>
            </div>

            {/* Image Panel */}
            <div className="image-panel" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <h2>Welcome Image</h2>
                <img src="/images/sample-image.png" alt="Welcome" style={{ maxWidth: "300px", height: "auto" }} />
            </div>

            {/* JSON Panel */}
            <div className="json-panel">
                <h2>API Responses</h2>
                <CollapsiblePanel title="Weather API Response" content={JSON.stringify(weather, null, 2)} />
                <CollapsiblePanel title="IP Response" content={JSON.stringify(ipResponse, null, 2)} />
                <CollapsiblePanel title="Location Response" content={JSON.stringify(locationResponse, null, 2)} />
            </div>
        </div>
    );
}

export default WelcomePage;