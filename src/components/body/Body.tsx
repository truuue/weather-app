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
    <div>
      <h1>Weather App</h1>
      <p>
        This is a weather app that allows you to check the weather in different
        cities.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>

      <br />

      <Weather city={city} />
    </div>
  );
};

export default Body;
