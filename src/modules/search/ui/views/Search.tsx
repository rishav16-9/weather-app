import { fetchWeatherDetails } from "@/api/weatherService";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../store";
import { ErrorView } from "@/modules/error/ErrorView";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { fetchData } from "@/redux/actions/actions";

interface Props {
  location: string;
}

const LAST_SEARCHED_CITY_KEY = "lastsearchedcitykey";

export const Search = ({ location }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const initialSearch =
    location || localStorage.getItem("LAST_SEARCHED_CITY_KEY") || "";
  const [value, setValue] = useState(initialSearch);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    try {
      const result = await fetchWeatherDetails(value.toLowerCase().trim());
      if (result.error) {
        setError(result.error.message);
        dispatch(fetchData(undefined));
        return;
      }
      dispatch(fetchData(result));
      localStorage.setItem(LAST_SEARCHED_CITY_KEY, value);
    } catch (error) {
      console.log(error);
    }
  };

  const firstLoad = async () => {
    try {
      const result = await fetchWeatherDetails(value.toLowerCase().trim());
      if (result.error) {
        setError(result.error.message);
        dispatch(fetchData(undefined));
        return;
      }
      dispatch(fetchData(result));
      localStorage.setItem(LAST_SEARCHED_CITY_KEY, value);
      toast.success("Data fetched");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    firstLoad();
  }, []);

  return (
    <>
      <form className="flex w-full max-w-[800px] pt-4" onSubmit={handleSearch}>
        <input
          type="text"
          value={value}
          className={cn(
            "w-full pl-4 py-2 pr-12 rounded-l-full border border-gray-800 focus:outline-none focus:border-black"
          )}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your city"
        />
        <button
          disabled={!value.trim()}
          type="submit"
          className="px-5 py-2.5 bg-gray-100 border-gray-00 border border-l-0 rounded-r-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer "
        >
          <SearchIcon className="size-5" />
        </button>
      </form>
      {error && <ErrorView errorMessage={error} />}
    </>
  );
};
