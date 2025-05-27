import { Search } from "../../modules/search/ui/views/Search";
import Weather from "../weather/Weather";

const Home = () => {
  const location = localStorage.getItem("lastsearchedcitykey") || "";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-700 via-bg-[#f4f4f3] to-amber-400 ">
      <Search location={location} />
      <Weather />
    </div>
  );
};

export default Home;
