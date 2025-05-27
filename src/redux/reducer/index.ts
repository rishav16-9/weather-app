import { combineReducers } from "redux";
import { weatherReducer } from "./reducers";

const reducer = combineReducers({
  weatherData: weatherReducer,
});

export default reducer;
