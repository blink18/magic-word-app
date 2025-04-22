import React, { useState, useEffect } from "react";
import config from "../config";
import "../assets/styles.css";

function WelcomePage() {
    const [location, setLocation] = useState(localStorage.getItem("weatherLocation") || "iata:HYD");
    const [weather, setWeather] = useState(null);

    const fetchWeather = async () => {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?q=${location}&key=${config.weatherApiKey}`);
            const data = await response.json();
            setWeather(data);
            localStorage.setItem("weatherLocation", location);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, []);

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
                    <button onClick={fetchWeather}>Get Weather</button>
                </div>
            </div>

            {/* Image Panel */}
            <div className="image-panel" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <h2>Welcome Image</h2>
                <img src="/images/sample-image.png" alt="Welcome" style={{ maxWidth: "300px", height: "auto" }} />
            </div>
        </div>
    );
}

export default WelcomePage;