import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetchWeatherApi } from "openmeteo";

// Debounce hook to prevent unnecessary API calls.
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());
export const geocodingAPIUrl = "https://geocoding-api.open-meteo.com/v1/search";
export const weatherAPIUrl = "https://api.open-meteo.com/v1/forecast";

// Fetch coordinates of a place using OpenMeteo Geocoding API.
export function useGetCoordinates(place: string) {
  const { data, error, isLoading } = useSWR(
    place
      ? `${geocodingAPIUrl}?name=${encodeURIComponent(
          place,
        )}&count=10&language=en&format=json`
      : null,
    fetcher,
  );

  return {
    geocodeData: data,
    isLoading,
    isError: error,
  };
}

type FetchedWeatherData = {
  lat: number;
  long: number;
};

// Fetch current weather data using OpenMeteo API.
export async function fetchCurrentWeatherData(
  { lat, long }: FetchedWeatherData,
  unit: string,
) {
  let params;
  if (unit !== "metric") {
    params = {
      latitude: lat,
      longitude: long,
      current: [
        "precipitation",
        "temperature_2m",
        "wind_speed_10m",
        "relative_humidity_2m",
        "apparent_temperature",
      ],
      wind_speed_unit: "mph",
      temperature_unit: "fahrenheit",
      precipitation_unit: "inch",
    };
  } else {
    params = {
      latitude: lat,
      longitude: long,
      current: [
        "precipitation",
        "temperature_2m",
        "wind_speed_10m",
        "relative_humidity_2m",
        "apparent_temperature",
      ],
    };
  }

  const responses = await fetchWeatherApi(weatherAPIUrl, params);

  // Process first location.
  const response = responses[0];

  // Attribute for timezone
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const current = response.current()!;

  const date = new Date((Number(current.time()) + utcOffsetSeconds) * 1000);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long", // e.g. "Tuesday"
    month: "short", // e.g. "Sept"
    day: "numeric", // e.g. "4"
    year: "numeric", // e.g. "2025"
  }).format(date);

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    current: {
      time: formattedDate,
      precipitation: current.variables(0)!.value(),
      temperature_2m: current.variables(1)!.value(),
      wind_speed_10m: current.variables(2)!.value(),
      relative_humidity_2m: current.variables(3)!.value(),
      apparent_temperature: current.variables(4)!.value(),
    },
  };

  return weatherData.current;
}
