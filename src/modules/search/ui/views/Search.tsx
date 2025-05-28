import { fetchWeatherDetails } from "@/api/weatherService";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../store";
import { ErrorView } from "@/modules/error/ErrorView";
import { toast } from "sonner";
import { fetchData } from "@/redux/actions/actions";

interface Props {
  location: string;
}

const LAST_SEARCHED_CITY_KEY = "lastsearchedcitykey";

export const Search = ({ location }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const initialSearch =
    location || localStorage.getItem(LAST_SEARCHED_CITY_KEY) || "";
  const [value, setValue] = useState(initialSearch);
  const [searchValue, setSearchValue] = useState(initialSearch); // New state for the actual search term
  const [error, setError] = useState("");

  const fetchWeatherData = async (city: string) => {
    if (!city.trim()) return;
    try {
      const result = await fetchWeatherDetails(city.toLowerCase().trim());
      if (result.error) {
        setError(result.error.message);
        dispatch(fetchData(undefined));
        return;
      }
      dispatch(fetchData(result));
      localStorage.setItem(LAST_SEARCHED_CITY_KEY, city);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update weather data");
    }
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchValue(value); // Update the actual search term
    await fetchWeatherData(value);
  };

  useEffect(() => {
    // Initial load
    fetchWeatherData(searchValue);

    // Set up interval for refreshing data
    const intervalId = setInterval(() => {
      fetchWeatherData(searchValue);
    }, 30000); // 30 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [searchValue]); // Only trigger when searchValue changes (on form submit)

  return (
    <>
      <form
        className="max-w-(--breakpoint-xl) flex justify-center w-full px-4 pt-4"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          value={value}
          className="w-full pl-4 py-2 pr-12 text-white rounded-l-full border border-[#F4F4F3] focus:outline-none focus:border-black"
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your city"
        />
        <button
          disabled={!value.trim()}
          type="submit"
          className="px-5 py-2.5 bg-transparent  border-[#F4F4F3] border-l-0 rounded-r-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer "
        >
          <SearchIcon className="size-5 text-white" />
        </button>
      </form>
      {error && <ErrorView errorMessage={error} />}
    </>
  );
};
