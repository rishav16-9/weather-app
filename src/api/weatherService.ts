import { DEFAULT_DAYS } from "@/constants";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeatherDetails = async (location: string) => {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=${DEFAULT_DAYS}`
  );
  const data = await response.json();
  return data;
};
