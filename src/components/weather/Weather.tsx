import React, { useState, useEffect } from "react";
import axios from "axios";
import Graph from "./ForecastGraph";

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
  const [forecastData, setForecastData] = useState<any | null>(null);

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

  useEffect(() => {
    const fetchForecast = async () => {
      const API_KEY = process.env.REACT_APP_API_KEY;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<any>(
          `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
        );
        setForecastData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching forecast data");
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city]);

  interface ForecastItem {
    dt: number;
    main: {
      temp: number;
    };
  }

  const getChartData = () => {
    if (!forecastData) return [];

    return forecastData.list.slice(0, 8).map((item: ForecastItem) => ({
      x: new Date(item.dt * 1000),
      y: kelvinToCelsius(item.main.temp),
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!weatherData || !forecastData) return null;

  const chartData = getChartData();

  return (
    <>
      <h2>Weather in {cleanCityName(weatherData.name)}</h2>
      <p>Temperature: {kelvinToCelsius(weatherData.main.temp)}°C</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Description: {weatherData.weather[0].description}</p>
      <img
        src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
        alt="Weather icon"
      />

      {/* Hidden 24H forecast */}
      <div className="hidden">
        <div className="flex flex-col justify-center items-center">
          <h3>24H forecast</h3>

          <div style={{ width: "100%", height: "300px" }}>
            <Graph data={chartData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
