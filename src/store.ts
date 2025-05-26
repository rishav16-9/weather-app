import { configureStore } from "@reduxjs/toolkit";
import reducer from "./redux/reducer";
const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
export type AppDispatch = typeof store.dispatch;
