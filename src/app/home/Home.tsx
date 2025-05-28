import { Search } from "../../modules/search/ui/views/Search";
import Weather from "../weather/Weather";

const Home = () => {
  const location = localStorage.getItem("lastsearchedcitykey") || "";

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-700 via-slate-400 to-amber-400">
      <div className="flex-1 flex flex-col items-center justify-start pt-20 pb-8 px-4 w-full">
        <Search location={location} />
        <div className="w-full max-w-4xl">
          <Weather />
        </div>
      </div>
    </div>
  );
};

export default Home;
