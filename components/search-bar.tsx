"use client";

import { useEffect, useState } from "react";
import { Icons } from "./icons";
import SearchDropdown from "./search-dropdown";
import { useWeatherStore } from "@/store/weatherStore";
import useDebounce from "@/hooks/useDebounce";
import useGetCoordinates from "@/hooks/useGetCoordinates";

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
    fetchHourlyForecastData,
    setCoordinates,
    noResultFound,
    toggleResultFound,
  } = useWeatherStore();
  const [searchText, setSearchText] = useState(""); // user input
  const [suppressSuggestions, setSuppressSuggestions] = useState(false); // prevent dropdown from reappearing
  const debouncedSearchText = useDebounce(searchText, 500); // debounce search text
  const { geocodeData, isLoading } = useGetCoordinates(debouncedSearchText); // fetch geocode data (i.e latitude and longitude).
  const [suggestions, setSuggestions] = useState([]); // suggestions from geocode data to populate dropdown.
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<Suggestion | null>(null);

  const handleSelect = (suggestion: Suggestion) => {
    setSearchText(
      suggestion.name +
        `${suggestion.country ? `, ${suggestion.country}` : ""}`,
    ); // autofill input
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
      toggleResultFound(false);
    }
    if (isLoading && !geocodeData?.results) {
      toggleResultFound(true);
    }
  }, [geocodeData, searchText]);

  const searchWeatherInfo = async (suggestion: Suggestion) => {
    setCityName(
      suggestion.name +
        `${suggestion.country ? `, ${suggestion.country}` : ""}`,
    );
    setCoordinates(suggestion.latitude, suggestion.longitude);
    fetchCurrentWeatherData();
    fetchDailyForecastData();
    fetchHourlyForecastData();
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
            className="w-full cursor-pointer rounded-(--radius-12) bg-(--clr-neutral-800) py-(--sp-200) pr-(--sp-300) pl-[3.75rem] text-(length:--fs-20) leading-(--lh-120) font-medium text-(--clr-neutral-0) placeholder:font-medium placeholder:text-(--clr-neutral-200)"
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
          className={`${selectedSuggestion === null || isLoading || noResultFound || !searchText ? "cursor-not-allowed" : "cursor-pointer"} font-dm-sans rounded-(--radius-12) bg-(--clr-blue-500) px-(--sp-300) py-(--sp-200) text-(length:--fs-20) leading-(--lh-120) font-medium text-(--clr-neutral-0) hover:bg-(--clr-blue-700) focus-visible:outline-offset-2 focus-visible:outline-(--clr-blue-500) focus-visible:outline-solid`}
          onClick={() => {
            if (selectedSuggestion !== null) {
              searchWeatherInfo(selectedSuggestion);
            }
          }}
          disabled={
            selectedSuggestion === null ||
            isLoading ||
            noResultFound ||
            !searchText.trim()
          }
        >
          Search
        </button>
      </div>
      {/* suggestions */}
      {isLoading ? (
        <div className="absolute top-[4rem] z-10 flex max-h-[11.5rem] flex-col gap-y-(--sp-050) rounded-(--radius-12) border border-(--clr-neutral-700) bg-(--clr-neutral-800) p-(--sp-100) lg:w-[32.875rem]">
          <div className="flex gap-x-(--sp-125) px-(--sp-100) py-(--sp-125)">
            <Icons.loading />
            <span className="text-(length:--fs-16) leading-(--lh-120) font-medium text-(--clr-neutral-0)">
              Search in progress
            </span>
          </div>
        </div>
      ) : (
        suggestions.length > 0 && (
          <SearchDropdown suggestions={suggestions} onSelect={handleSelect} />
        )
      )}
    </div>
  );
};

export default SearchBar;
