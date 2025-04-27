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
    const [loading, setLoading] = useState(false);

    const fetchLocationFromIP = async () => {
        try {
            console.log("Attempting to get IP");
            const ipResponse = await fetch("https://ip4only.me/api/");
            const ipDataRaw = await ipResponse.text(); // Fetch raw text response
            const ipData = ipDataRaw.split(",")[1]; // Extract the IP address (second field)
            setIpResponse({ ipString: ipData }); // Update state with extracted IP address
            console.log("IP Data:", ipData);
            console.log("Location fetch query:", `ip-api.com/json/${ipData}?fields=57362`);

            // See https://ip-api.com/docs/api:json for fields number explanation in the below call
            const locationResponse = await fetch(`http://ip-api.com/json/${ipData}?fields=49170`);
            const locationData = await locationResponse.json();
            console.log("Location Data:", locationData);
            if (locationData.status === "success") {
                setLocationResponse(locationData);
                const city = locationData.city || "iata:HYD";
                setLocation(city);
                return city;
            } else {
                console.error("Error fetching location from IP API:", locationData.message);
                return "iata:HYD"; // Fallback in case of error
            }
        } catch (error) {
            console.error("Error fetching location from IP:", error);
            return "iata:HYD"; // Fallback in case of error
        }
    };

    useEffect(() => {
        const initializeWeather = async () => {
            const savedWeather = localStorage.getItem("weatherData");
            const savedLocation = localStorage.getItem("weatherLocation");
            if (savedWeather && savedLocation) {
                setWeather(JSON.parse(savedWeather)); // Display saved weather data
                setLocation(savedLocation); // Retain the last used location
            } else {
                const detectedLocation = await fetchLocationFromIP();
                setLocation(detectedLocation);
                const response = await fetch(`https://api.weatherapi.com/v1/current.json?q=${detectedLocation}&key=${config.weatherApiKey}`);
                const data = await response.json();
                setWeather(data);
                localStorage.setItem("weatherData", JSON.stringify(data)); // Save weather data for future use
                localStorage.setItem("weatherLocation", detectedLocation); // Save detected location
            }
        };

        initializeWeather();
    }, []); // Run only once when the component mounts

    const handleFetchWeather = async () => {
        if (location.trim()) {
            setLoading(true); // Set loading to true
            try {
                const response = await fetch(`https://api.weatherapi.com/v1/current.json?q=${location}&key=${config.weatherApiKey}`);
                const data = await response.json();
                setWeather(data);
                localStorage.setItem("weatherData", JSON.stringify(data)); // Update saved weather data
                localStorage.setItem("weatherLocation", location); // Update saved location
                console.log(`Weather being fetched for location: ${location}`);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            } finally {
                setLoading(false); // Set loading to false
            }
        }
    };

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
                {loading ? (
                    <div className="weather-result">
                        <img src="/images/wait.webp" alt="Loading..." style={{ maxWidth: "100px", height: "auto" }} />
                    </div>
                ) : (weather && weather.location && (
                    <div className="weather-result">
                        <p><strong>Location:</strong> {weather.location.name}</p>
                        <p><strong>Temperature:</strong> {weather.current.temp_c}°C</p>
                        <p><strong>Condition:</strong> {weather.current.condition.text}</p>
                    </div>
                ))}
                <div className="input-button-container">
                    <input
                        type="text"
                        name="weather-location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter location"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleFetchWeather();
                            }
                        }}
                    />
                    <button
                        onClick={handleFetchWeather}
                    >
                        Get Weather <FontAwesomeIcon icon={faCloudSun} />
                    </button>
                </div>
            </div>

            {/* Image Panel */}
            <div className="image-panel" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <h2>Welcome Image</h2>
                <img src="images/sample-image.png" alt="Welcome" style={{ maxWidth: "300px", height: "auto" }} />
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