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
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <h1 className="text-4xl font-semibold pb-5">Weather App</h1>
      <p className="text-lg pb-5">
        This is a weather app that allows you to check the weather in different
        cities.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-row justify-center items-center gap-2 pb-5"
      >
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          placeholder="Enter city name"
          className="p-1 border border-gray-200 rounded-lg shadow"
        />
        <button
          type="submit"
          className="p-1 border border-gray-200 rounded-lg shadow"
        >
          Search
        </button>
      </form>

      <Weather city={city} />
    </div>
  );
};

export default Body;
