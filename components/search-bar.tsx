"use client";

import { useEffect, useState } from "react";
import { Icons } from "./icons";
import { useDebounce, useGetCoordinates } from "@/lib/utils";
import SearchDropdown from "./search-dropdown";
import { useWeatherStore } from "@/store/weatherStore";

type Suggestion = {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
};

const SearchBar = () => {
  const {
    setCityName,
    fetchCurrentWeatherData,
    fetchDailyForecastData,
    setCoordinates,
  } = useWeatherStore();
  const [searchText, setSearchText] = useState(""); // user input
  const [suppressSuggestions, setSuppressSuggestions] = useState(false); // prevent dropdown from reappearing
  const debouncedSearchText = useDebounce(searchText, 500); // debounce search text
  const { geocodeData, isLoading } = useGetCoordinates(debouncedSearchText); // fetch geocode data (i.e latitude and longitude).
  const [suggestions, setSuggestions] = useState([]); // suggestions from geocode data to populate dropdown.
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<Suggestion | null>(null);

  const handleSelect = (suggestion: Suggestion) => {
    setSearchText(suggestion.name + " " + suggestion.country); // autofill input
    setSuggestions([]); // hide dropdown
    setSelectedSuggestion(suggestion);
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

  const searchWeatherInfo = async (suggestion: Suggestion) => {
    // console.log("selected suggestion", searchText);
    setCityName(suggestion.name + " " + suggestion.country);
    setCoordinates(suggestion.latitude, suggestion.longitude);
    fetchCurrentWeatherData();
    fetchDailyForecastData();
    setSearchText("");
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
          className={`${selectedSuggestion === null || isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"} font-dm-sans rounded-(--radius-12) bg-(--clr-blue-500) px-(--sp-300) py-(--sp-200) text-(length:--fs-20) leading-(--lh-120) font-medium text-(--clr-neutral-0)`}
          onClick={() => {
            if (selectedSuggestion !== null) {
              searchWeatherInfo(selectedSuggestion);
            }
          }}
          disabled={selectedSuggestion === null || isLoading}
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
