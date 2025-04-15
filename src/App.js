import React, { useState } from "react";
import "./App.css";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    if (data.cod == 200) {
      setWeather(data);
    } else {
      setWeather(null);
      alert("City not found!");
    }
  };

  return (
    <div className="app">
      <h1>⛅ Weather App</h1>
      <div className="search">
        <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <h3>{weather.main.temp}℃</h3>
          <p>{weather.weather[0].description}</p>
          <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="weather-icon"
          />
          </div>
      )}
    </div>
  );
}

export default App;