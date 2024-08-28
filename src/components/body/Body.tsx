import { useState, useEffect, useCallback } from "react";

const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

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

const Body = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState("Paris");
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`
      );
      if (!response.ok) {
        throw new Error("Données météo non trouvées");
      }
      const data: WeatherData = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données météo:", error);
      setError("Impossible de récupérer les données météo. Veuillez réessayer.");
    }
  }, [city]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Application Météo</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="mb-4 p-2 border rounded"
          placeholder="Entrez une ville"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Obtenir la météo
        </button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {weather && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold">{weather.name}</h2>
          <p className="text-xl">{Math.round(weather.main.temp)}°C</p>
          <p>{weather.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Icône météo"
          />
          <p>Humidité: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default Body;
