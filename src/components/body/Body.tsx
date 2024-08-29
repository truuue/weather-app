import React from "react";
import Weather from "../weather/Weather";

const Body: React.FC = () => {
  return (
    <div>
      <h1>Weather App</h1>
      <p>
        This is a weather app that allows you to check the weather in different
        cities.
      </p>

      <br />
      <Weather />
    </div>
  );
};

export default Body;
