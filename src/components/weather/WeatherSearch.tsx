import React, { useState } from "react";

interface WeatherSearchProps {
  onCityChange: (city: string) => void;
}

const WeatherSearch: React.FC<WeatherSearchProps> = ({ onCityChange }) => {
  const [inputCity, setInputCity] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputCity.trim()) {
      onCityChange(inputCity.trim());
      setInputCity("");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
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
    </div>
  );
};

export default WeatherSearch;
