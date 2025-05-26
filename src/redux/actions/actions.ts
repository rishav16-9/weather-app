import type { Dispatch } from "redux";
import { ACTION_TYPE } from "../constants/action-type";

export const fetchWeatherDetails = () => async (dispatch: Dispatch) => {
  const response = await fetch(
    "http://api.weatherapi.com/v1/forecast.json?key=&q=kathmandu&days=5"
  );

  dispatch({
    type: ACTION_TYPE.FETCH_WEATHER_DETAIL,
    payload: await response.json(),
  });
};
