import React, { useState } from "react";
import Weather from "../weather/Weather";

const Body: React.FC = () => {
  const [city, setCity] = useState<string>("Toulouse");
  const [inputCity, setInputCity] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputCity.trim()) {
      setCity(inputCity.trim());
      setInputCity("");
    }
  };

  return (
    <div className="flex flex-col justify-start items-center w-screen min-h-screen p-4 overflow-y-auto">
      {/* hidden title for referencing */}
      <h1 className="hidden">Weather App</h1>

      {/* Hour and city */}
      <div className="flex flex-col justify-center items-center p-4 bg-gray-100 rounded-lg mb-4">
        <h2 className="text-xl font-semibold mb-2">{city}</h2>
        <p className="text-2xl font-semibold">
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </p>
        <p className="text-sm">
          {new Date().toLocaleDateString("en-EN", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Search bar */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-row justify-center items-center gap-2 mb-4"
      >
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          placeholder="Enter city name"
          className="p-2 border border-gray-200 rounded-lg shadow"
        />
        <button
          type="submit"
          className="p-2 border border-gray-200 rounded-lg shadow"
        >
          Search
        </button>
      </form>

      {/* Weather */}
      <div className="w-full max-w-md">
        <Weather city={city} />
      </div>
    </div>
  );
};

export default Body;
