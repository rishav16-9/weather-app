import { ACTION_TYPE } from "../constants/action-type";
import type { WeatherPayload } from "@/modules/weather/types";

export const fetchData = (data: WeatherPayload | undefined) => {
  return {
    type: ACTION_TYPE.FETCH_DATA,
    payload: data,
  };
};
