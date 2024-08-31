import React from "react";

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

interface WeatherDayData {
  date: Date;
  maxTemp: number;
  minTemp: number;
  weather: WeatherData["weather"];
}

interface WeatherWeekListProps {
  data: WeatherDayData[];
}

const WeatherWeekList: React.FC<WeatherWeekListProps> = ({ data }) => {
  const formatDate = (date: Date) => {
    if (!(date instanceof Date)) return "";
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }
    return date.toLocaleDateString("en-EN", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  return (
    <div className="bg-gradient-to-b from-blue-400 to-blue-600 rounded-xl shadow-lg p-4 max-w-sm mx-auto">
      <h2 className="text-white text-xl font-semibold mb-4">6D Forecast</h2>
      <ul className="space-y-3">
        {data.map((day, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-white bg-opacity-20 rounded-lg p-2 text-white"
          >
            <div className="flex items-center">
              <img
                src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                alt={day.weather[0].description}
                className="w-10 h-10 mr-3"
              />
              <div>
                <div className="font-medium">{formatDate(day.date)}</div>
                <div className="text-sm">{day.weather[0].description}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold">{Math.round(day.maxTemp)}°C</div>
              <div className="text-sm">{Math.round(day.minTemp)}°C</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherWeekList;
