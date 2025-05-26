import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchWeatherDetails } from "./redux/actions/actions";
import type { AppDispatch } from "./store";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchWeatherDetails());
  }, [dispatch]);
  return <div className="text-pink-400 text-4xl">Test</div>;
}

export default App;
