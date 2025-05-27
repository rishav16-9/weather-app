import type { WeatherPayload } from "@/api/weather-data-interface";
import { getDate, getDay, getTIme } from "@/lib/date-utils";
import { Snowflake } from "lucide-react";
import { useSelector } from "react-redux";

export default function WeatherView() {
  const selector = useSelector(
    (state: { weatherData: WeatherPayload }) => state.weatherData
  );

  return (
    <div className="flex w-full max-w-[800px] pt-4">
      {/* Content */}
      <div className="h-full p-6 text-white">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <h2 className="text-lg font-medium opacity-90">Sample Text</h2>
          <div className="text-right text-sm opacity-90">
            <div>{selector.location.name || ""}</div>
            <div>{getTIme(selector.location.localtime)}</div>
          </div>
        </div>

        {/* Main Weather Icon */}
        <div className="flex justify-center mb-8">
          <img
            src={`https:${selector.current.condition.icon}`}
            alt={selector.current.condition.text}
          />
        </div>

        {/* Current Weather Info */}
        <div className="flex items-center justify-between">
          {/* Left side - Temperature */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Snowflake className="w-4 h-4" />
              <span className="text-sm font-medium tracking-wider">
                WEATHER
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-center">
                <div className="text-4xl font-light">
                  {selector.current.temp_c}
                </div>
                <div className="text-sm opacity-80">
                  {getDate(selector.location.localtime)}
                </div>
              </div>
              <div className="flex">
                <img
                  src={`https:${selector.current.condition.icon}`}
                  alt={selector.current.condition.text}
                />
              </div>
            </div>
          </div>

          {/* Right side - Weekly Forecast */}
          <div className="flex space-x-4">
            {selector.forecast.forecastday.map((day, index) => {
              return (
                <div key={index} className="text-center">
                  <div className="text-xs opacity-80 mb-1">
                    {getDay(day.date)}
                  </div>
                  <img
                    src={`https:${day.day.condition.icon}`}
                    alt={day.day.condition.text}
                  />
                  <div className="text-xs">{day.day.avgtemp_c}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
