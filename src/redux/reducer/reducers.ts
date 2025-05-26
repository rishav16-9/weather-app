import type { WeatherPayload } from "@/api/weather-data-interface";
import { ACTION_TYPE } from "../constants/action-type";

interface WeatherState {
  weatherData?: WeatherPayload;
  loading: boolean;
  error?: string;
}

// Action interfaces
interface FetchWeatherDetailAction {
  type: typeof ACTION_TYPE.FETCH_WEATHER_DETAIL;
  payload: WeatherPayload;
}

type WeatherActionTypes = FetchWeatherDetailAction;

// Initial state
const initialState: WeatherState = {
  weatherData: undefined,
  loading: false,
  error: undefined,
};

export const weatherReducer = (
  state: WeatherState = initialState,
  action: WeatherActionTypes
) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_WEATHER_DETAIL:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
