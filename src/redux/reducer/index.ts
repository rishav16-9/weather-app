import { combineReducers } from "redux";
import { weatherReducer } from "./reducers";

const reducer = combineReducers({
  data: weatherReducer,
});

export default reducer;
