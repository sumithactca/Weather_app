"use client"; 

import { useState, useEffect } from "react";
import Input from "./components/input";
import Button from "./components/button";
import fetchWeatherData from "./utils/fetchWeather";
import { getWeatherIcon } from "./utils/getWeatherIcon";

export default function Home() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState<any>(null);
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }

    // Check if there's a saved city in localStorage
    const savedCity = localStorage.getItem("lastSearchedCity");
    if (savedCity) {
      setCity(savedCity);
      fetchWeatherData(savedCity).then((data) => {
        if (data) {
          setForecast(data);
        }
      });
    }
  }, []);

  const handleSubmit = async () => {
    if (!city) return;

    // Store the city in localStorage
    localStorage.setItem("lastSearchedCity", city);

    const data = await fetchWeatherData(city);
    if (data) {
      setForecast(data);
    } else {
      alert("Could not fetch weather data. Please try again.");
    }
  };

  // Toggle dark/light theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Save the theme in localStorage

    // Apply the theme to the body tag
    document.body.className = newTheme;
  };

  // Function to get the next 5 days from today
  const getNext5Days = () => {
    const today = new Date();
    const next5Days = [];
    for (let i = 0; i < 5; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      next5Days.push(nextDay.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' }));
    }
    return next5Days;
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h3>Weather App</h3>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="bg-gray-700 text-white px-4 py-2 rounded-md mt-2"
      >
        Toggle {theme === "light" ? "Dark" : "Light"} Mode
      </button>

      {/* Input Field */}
      <Input onCityChange={setCity} />

      {/* Button */}
      <Button onClick={handleSubmit} />

      {/* Display the entered city */}
      {city && <p className="text-lg mt-4">You entered: {city}</p>}

      {/* Display weather data if available */}
      {forecast && (
        <div className="mt-6 text-center">
          <h4 className="text-2xl">{forecast.city.name}</h4>
          <div>
            <h5>5-Day Forecast:</h5>
            <div className="flex space-x-8 justify-center overflow-x-auto">
              {forecast.list.slice(0, 5).map((item: any, index: number) => (
                <div
                  key={index}
                  className={`flex flex-col items-center border p-4 rounded-md shadow-md
                    ${theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"}`}
                >
                  {/* Display the date for each day */}
                  <p className="text-lg">{getNext5Days()[index]}</p>
                  <div className="flex items-center justify-center">
                    {/* Use the weather icon */}
                    {getWeatherIcon(item.weather[0].icon)}
                    <p className="text-xl ml-4 capitalize">{item.weather[0].description}</p>
                  </div>
                  <p className="text-lg">Temperature: {item.main.temp}°C</p>
                  <p className="text-lg">Feels like: {item.main.feels_like}°C</p>
                  <p className="text-lg">Wind Speed: {item.wind.speed} m/s</p>
                  <p className="text-lg">Humidity: {item.main.humidity}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
