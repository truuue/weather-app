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

interface WeatherProps {
  city: string;
}

const Weather: React.FC<WeatherProps> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const kelvinToCelsius = (kelvin: number): number => {
    return Math.round(kelvin - 273.15);
  };

  const cleanCityName = (name: string): string => {
    return name.replace(/^Arrondissement de /, "");
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!weatherData) return null;

  return (
    <div>
      <h2>Weather in {cleanCityName(weatherData.name)}</h2>
      <p>Temperature: {kelvinToCelsius(weatherData.main.temp)}°C</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Description: {weatherData.weather[0].description}</p>
      <img
        src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
        alt="Weather icon"
      />
    </div>
  );
};

export default Weather;
