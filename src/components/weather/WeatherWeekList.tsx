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
    <div className="flex flex-col justify-center items-center w-full h-full">
      <ul className="flex flex-row justify-evenly items-center w-4/5 h-full max-h-60">
        {data.map((day, index) => (
          <li
            key={index}
            className="flex flex-col justify-center items-center text-center max-w-28 min-w-28 h-full p-2 rounded-lg bg-gray-100"
          >
            {/* weather-day-date */}
            <div className="py-1">{formatDate(day.date)}</div>

            {/* weather-day-icon */}
            <div className="py-2">
              <img
                src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                alt={day.weather[0].description}
                className="w-10 h-10 mx-auto"
              />
            </div>

            {/* weather-day-temps */}
            <div className="flex flex-col justify-center items-center py-1">
              {/* weather-day-max-temp */}
              <span className="text-black text-lg">{day.maxTemp} °C</span>
              {/* weather-day-min-temp */}
              <span className="text-gray-500 text-md">{day.minTemp} °C</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherWeekList;
