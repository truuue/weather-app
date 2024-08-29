import React, { useState, useEffect } from "react";
import axios from "axios";

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  name: string;
}

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string>("Moscow");
  const [inputCity, setInputCity] = useState<string>("");

  const kelvinToCelsius = (kelvin: number): number => {
    return Math.round(kelvin - 273.15);
  };

  useEffect(() => {
    const fetchWeather = async () => {
      const API_KEY = process.env.REACT_APP_API_KEY;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<WeatherData>(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );
        setWeatherData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching weather data");
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputCity.trim()) {
      setCity(inputCity.trim());
      setInputCity("");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!weatherData) return null;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>

      <div>
        <h2>Weather in {weatherData.name}</h2>
        <p>Temperature: {kelvinToCelsius(weatherData.main.temp)}°C</p>
        <p>Humidity: {weatherData.main.humidity}%</p>
        <p>Description: {weatherData.weather[0].description}</p>
        <img
          src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
          alt="Weather icon"
        />
      </div>
    </div>
  );
};

export default Weather;
