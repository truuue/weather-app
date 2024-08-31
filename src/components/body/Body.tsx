import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "../weather/Weather";
import WeatherWeekList from "../weather/WeatherWeekList";
import HourlyForecast from "../weather/HourlyForecast";
import Locale from "./Locale";
import WeatherSearch from "../weather/WeatherSearch";

interface WeatherDayData {
  date: Date;
  maxTemp: number;
  minTemp: number;
  icon: string;
  weather: Array<{ description: string; icon: string }>;
}

const Body: React.FC = () => {
  const [city, setCity] = useState<string>("Toulouse");
  const [forecastData, setForecastData] = useState<any | null>(null);
  const [weekForecastData, setWeekForecastData] = useState<WeatherDayData[]>(
    []
  );
  const [hourlyForecastData, setHourlyForecastData] = useState<any[]>([]);

  const kelvinToCelsius = (kelvin: number): number => {
    return Math.round(kelvin - 273.15);
  };

  const getWeekForecastData = (): WeatherDayData[] => {
    if (!forecastData) return [];

    const dailyData: WeatherDayData[] = [];
    const dailyMap = new Map();

    forecastData.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000);
      const dateString = date.toDateString();

      if (!dailyMap.has(dateString)) {
        dailyMap.set(dateString, {
          date,
          maxTemp: kelvinToCelsius(item.main.temp_max),
          minTemp: kelvinToCelsius(item.main.temp_min),
          icon: item.weather[0].icon,
          weather: item.weather,
        });
      } else {
        const existingData = dailyMap.get(dateString);
        existingData.maxTemp = Math.max(
          existingData.maxTemp,
          kelvinToCelsius(item.main.temp_max)
        );
        existingData.minTemp = Math.min(
          existingData.minTemp,
          kelvinToCelsius(item.main.temp_min)
        );
      }
    });

    dailyMap.forEach((value) => dailyData.push(value));

    return dailyData;
  };

  useEffect(() => {
    const fetchForecast = async () => {
      const API_KEY = process.env.REACT_APP_API_KEY;

      try {
        const response = await axios.get<any>(
          `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
        );
        setForecastData(response.data);
      } catch (err) {
        console.error("Error fetching forecast data", err);
      }
    };

    fetchForecast();
  }, [city]);

  useEffect(() => {
    if (forecastData) {
      const data = getWeekForecastData();
      setWeekForecastData(data);
    }
  }, [forecastData]);

  useEffect(() => {
    if (forecastData) {
      const currentHour = new Date().getHours();
      const data = forecastData.list
        .slice(0, 6)
        .map((item: any, index: number) => {
          const hour = (currentHour + index + 1) % 24;
          return {
            time: `${hour.toString().padStart(2, "0")}:00`,
            temperature: kelvinToCelsius(item.main.temp),
            icon: item.weather[0].icon,
            description: item.weather[0].description,
          };
        });
      setHourlyForecastData(data);
    }
  }, [forecastData]);

  return (
    <div className="flex flex-col justify-start items-center w-screen min-h-screen p-4 overflow-y-auto">
      {/* hidden title for referencing */}
      <h1 className="hidden">Weather App</h1>

      {/* Locale */}
      <Locale city={city} />

      {/* WeatherSearch */}
      <WeatherSearch onCityChange={setCity} />

      {/* Weather */}
      <div className="w-full max-w-md">
        <Weather city={city} />
      </div>

      {/* 6H forecast */}
      <div className="w-full">
        <HourlyForecast data={hourlyForecastData} />
      </div>

      {/* 6D forecast */}
      <div className="w-full">
        <WeatherWeekList data={weekForecastData} />
      </div>
    </div>
  );
};

export default Body;
