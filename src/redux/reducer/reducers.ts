import type { WeatherPayload } from "@/modules/weather/types";
import { ACTION_TYPE } from "../constants/action-type";

interface WeatherState {
  weatherData?: WeatherPayload;
}

// Action interfaces
interface FetchWeatherDetailAction {
  type: typeof ACTION_TYPE.FETCH_DATA;
  payload: WeatherPayload;
}

type WeatherActionTypes = FetchWeatherDetailAction;

// Initial state
const initialState: WeatherState = {
  weatherData: undefined,
};

export const weatherReducer = (
  state: WeatherState = initialState,
  action: WeatherActionTypes
) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
