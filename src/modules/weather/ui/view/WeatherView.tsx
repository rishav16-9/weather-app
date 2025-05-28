import type { WeatherPayload } from "@/modules/weather/types";
import { getDate, getDay, getTIme } from "@/lib/date-utils";
import { Snowflake } from "lucide-react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

export default function WeatherView() {
  const selector = useSelector(
    (state: { weatherData: WeatherPayload }) => state.weatherData
  );
  const [isFarenheit, setIsFahrenheit] = useState(false);

  if (
    !selector ||
    !selector.location ||
    !selector.current ||
    !selector.forecast
  )
    return null;

  return (
    <div className="max-w-(--breakpoint-xl) flex justify-center w-full px-4 pt-4">
      {/* Content */}
      <div className="h-full p-4 md:p-6 text-white">
        {/* Header */}
        <div className="flex justify-between items-start mb-6 md:mb-8">
          <div className="text-right text-sm opacity-90">
            <div>{selector.location.name || ""}</div>
            <div>{getTIme(selector.location.localtime)}</div>
          </div>
          <Button
            size="icon"
            variant="secondary"
            className="cursor-pointer w-10 h-10"
            onClick={() => setIsFahrenheit((curr) => !curr)}
          >
            {isFarenheit ? "°C" : "F"}
          </Button>
        </div>

        {/* Main Weather Icon */}
        <div className="flex justify-center items-center mb-6 md:mb-8">
          <img
            src={`https:${selector.current.condition.icon}`}
            alt={selector.current.condition.text}
            className="w-24 h-24 md:w-32 md:h-32"
          />
        </div>

        {/* Current Weather Info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left side - Temperature */}
          <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
            <div className="flex items-center gap-x-2">
              <Snowflake className="w-4 h-4" />
              <span className="text-sm font-medium tracking-wider">
                WEATHER
              </span>
            </div>
            <div className="flex items-center gap-x-3 ml-auto md:ml-0">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-light font-mono w-[100px] md:w-[120px]">
                  {isFarenheit
                    ? `${selector.current.temp_f}${" F"}`
                    : `${selector.current.temp_c}${"°C"}`}
                </div>
                <div className="text-xs md:text-sm opacity-80">
                  {getDate(selector.location.localtime)}
                </div>
              </div>
              <div className="flex p-2 md:p-4 w-max">
                <img
                  src={`https:${selector.current.condition.icon}`}
                  alt={selector.current.condition.text}
                  className="w-12 h-12 md:w-16 md:h-16 object-contain block" // Added object-contain
                />
              </div>
            </div>
          </div>

          {/* Right side - Weekly Forecast */}
          <div className="w-full overflow-x-auto pb-2 flex items-center justify-center">
            <div className="flex gap-x-2 md:gap-x-4 min-w-max">
              {selector.forecast.forecastday.map((day, index) => {
                return (
                  <div key={index} className="flex items-center">
                    <div className="text-center">
                      <div className="text-xs opacity-80 mb-1">
                        {getDay(day.date)}
                      </div>
                      <img
                        src={`https:${day.day.condition.icon}`}
                        alt={day.day.condition.text}
                        className="w-8 h-8 md:w-10 md:h-10 mx-auto"
                      />
                      <div className="text-xs">
                        {isFarenheit
                          ? `${day.day.avgtemp_f}${" F"}`
                          : `${day.day.avgtemp_c}${"°C"}`}
                      </div>
                    </div>
                    {index < selector.forecast.forecastday.length - 1 && (
                      <Separator
                        orientation="vertical"
                        className="h-12 md:h-20 mx-1 md:mx-2"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
