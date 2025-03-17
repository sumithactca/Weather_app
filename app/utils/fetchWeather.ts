// utils/fetchWeather.ts

import axios from "axios";

interface WeatherResponse {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  visibility?: number;
  name: string;
}

interface ForecastResponse {
  list: {
    dt_txt: string;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
    wind: {
      speed: number;
    };
  }[];
}

const fetchWeatherData = async (city: string): Promise<ForecastResponse | null> => {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  if (!apiKey) {
    console.error("API key is missing. Make sure it's set in .env.local");
    return null;
  }

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get<ForecastResponse>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    if (axios.isAxiosError(error)) {
      console.error("Axios Error: ", error.response?.data);
    }
    return null;
  }
};

export default fetchWeatherData;
