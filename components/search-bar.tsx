"use client";

import { useEffect, useState } from "react";
import { Icons } from "./icons";
import { fetchWeatherData, useDebounce, useGetCoordinates } from "@/lib/utils";
import SearchDropdown from "./search-dropdown";
import { useWeatherStore } from "@/store/weatherStore";

type Suggestion = {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
};

type SearchParams = {
  lat: number;
  long: number;
};

const SearchBar = () => {
  const { unitSI: unit } = useWeatherStore(); // unit
  const [searchText, setSearchText] = useState(""); // user input
  const [suppressSuggestions, setSuppressSuggestions] = useState(false); // prevent dropdown from reappearing
  const [searchWeatherParams, setSearchWeatherParams] =
    useState<SearchParams | null>(null); // latitude and longitude
  const debouncedSearchText = useDebounce(searchText, 500); // debounce search text
  const { geocodeData, isLoading } = useGetCoordinates(debouncedSearchText); // fetch geocode data (i.e latitude and longitude).
  const [suggestions, setSuggestions] = useState([]); // suggestions from geocode data to populate dropdown.

  const handleSelect = (suggestion: Suggestion) => {
    setSearchText(suggestion.name); // autofill input
    setSuggestions([]); // hide dropdown
    setSearchWeatherParams({
      lat: suggestion.latitude,
      long: suggestion.longitude,
    });
    setSuppressSuggestions(true); // prevent dropdown from reappearing
  };

  useEffect(() => {
    if (suppressSuggestions) return; // hide dropdown if input is cleared.

    if (!searchText.trim()) {
      // hide dropdown if input is cleared
      setSuggestions([]);
      return;
    }

    if (geocodeData?.results) {
      setSuggestions(geocodeData.results); // populate suggestions array for dropdown.
    }
  }, [geocodeData, searchText]);

  const searchWeatherInfo = async () => {
    if (searchWeatherParams) {
      const res = await fetchWeatherData(searchWeatherParams, unit);
      // console.log(`res for search ${searchText}`, JSON.stringify(res, null, 2));
    }
  };

  return (
    <div className="relative flex w-full flex-col xl:w-[41rem]">
      {/* search bar */}
      <div className="flex w-full flex-col gap-x-(--sp-200) gap-y-(--sp-150) md:flex-row">
        <div className="relative w-full">
          <div className="absolute top-1/2 left-(--sp-300) -translate-y-1/2">
            <Icons.search />
          </div>
          <input
            type="text"
            placeholder="Search for a place..."
            className="w-full rounded-(--radius-12) bg-(--clr-neutral-800) py-(--sp-200) pr-(--sp-300) pl-[3.75rem] text-(length:--fs-20) leading-(--lh-120) font-medium text-(--clr-neutral-0) placeholder:font-medium placeholder:text-(--clr-neutral-200)"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setSuppressSuggestions(false); // allow suggestions to reappear if typing again
            }}
          />
        </div>
        {/* search button */}
        <button
          type="button"
          className={`${searchWeatherParams === null || isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"} font-dm-sans rounded-(--radius-12) bg-(--clr-blue-500) px-(--sp-300) py-(--sp-200) text-(length:--fs-20) leading-(--lh-120) font-medium text-(--clr-neutral-0)`}
          onClick={() => searchWeatherInfo()}
          disabled={searchWeatherParams === null || isLoading}
        >
          Search
        </button>
      </div>
      {/* suggestions */}
      {!isLoading && suggestions.length > 0 && (
        <SearchDropdown suggestions={suggestions} onSelect={handleSelect} />
      )}
    </div>
  );
};

export default SearchBar;
