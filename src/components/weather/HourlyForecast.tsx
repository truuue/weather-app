import React from "react";

const formatTime = (date: Date): string => {
  return `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
};

const HourlyForecast: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl shadow-lg p-4 max-w-md mx-auto">
      <h3 className="text-white text-lg font-semibold mb-3">Hourly Forecast</h3>
      <div className="flex justify-between ">
        {data.map((item, index) => (
          <div key={index} className="text-center bg-white bg-opacity-20 rounded-lg p-2">
            <p className="text-white font-medium">{item.time}</p>
            <img
              src={`http://openweathermap.org/img/w/${item.icon}.png`}
              alt={item.description}
              className="w-10 h-10 mx-auto my-1"
            />
            <p className="text-white text-sm">{item.temperature}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
