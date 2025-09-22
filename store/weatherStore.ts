import { create } from "zustand";
import {
  fetchCurrentWeatherData,
  fetchDailyWeatherData,
  fetchHourlyWeatherData,
  UVCategory,
} from "@/lib/utils";

// Berlin, Germany coordinates for initial state
const berlinGermanyCoordinates = {
  lat: 52.52000045776367,
  long: 13.419998168945312,
};

interface CurrentWeatherData {
  time: string;
  temperature_2m: number;
  wind_speed_10m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  precipitation: number;
}

export type DailyForecast = {
  day: string;
  desc: string;
  iconSrc: string;
  values: string[];
  sunrise: string;
  sunset: string;
  uvIndex: UVCategory;
};

type HourlyForecast = {
  time: string;
  description: string;
  iconSrc: string;
  temp: string;
};

export type HourlyForecastDataPerDay = {
  day: string;
  data: HourlyForecast[];
};

interface WeatherStoreState {
  unitSI: "metric" | "imperial";
  toggleUnit: () => void;
  cityName: string;
  currentWeatherData: CurrentWeatherData | null;
  dailyForecastData: DailyForecast[] | null;
  hourlyForecastData: HourlyForecastDataPerDay[] | null;
  lat: number;
  long: number;
  loading: boolean;
  error: boolean;
  noResultFound: boolean;
  toggleResultFound: (value: boolean) => void;
  setCityName: (name: string) => void;
  setCoordinates: (lat: number, long: number) => void;
  fetchCurrentWeatherData: () => Promise<void>;
  fetchDailyForecastData: () => Promise<void>;
  fetchHourlyForecastData: () => Promise<void>;
}

export const useWeatherStore = create<WeatherStoreState>((set, get) => ({
  unitSI: "metric",
  toggleUnit: async () => {
    const { unitSI } = get();
    const newUnit = unitSI === "metric" ? "imperial" : "metric";
    set({
      unitSI: newUnit,
    });
    await get().fetchCurrentWeatherData();
    await get().fetchDailyForecastData();
    await get().fetchHourlyForecastData();
  },
  cityName: "Berlin, Germany",
  currentWeatherData: null,
  dailyForecastData: null,
  hourlyForecastData: null,
  lat: berlinGermanyCoordinates.lat,
  long: berlinGermanyCoordinates.long,
  loading: false,
  error: false,
  noResultFound: false,
  toggleResultFound: (value) =>
    set({
      noResultFound: value,
    }),
  setCityName: (name) =>
    set({
      cityName: name,
    }),
  setCoordinates: (lat, long) =>
    set({
      lat,
      long,
    }),
  fetchCurrentWeatherData: async () => {
    const { lat, long, unitSI } = get();
    set({ loading: true });

    try {
      const data = await fetchCurrentWeatherData({ lat, long }, unitSI);
      set({ currentWeatherData: data, loading: false, error: false });
    } catch (error) {
      console.error("Error fetching current weather data:", error);
      set({ currentWeatherData: null, loading: false, error: true });
    }
  },
  fetchDailyForecastData: async () => {
    const { lat, long, unitSI } = get();
    set({ loading: true });

    try {
      const data = await fetchDailyWeatherData({ lat, long }, unitSI);
      set({ dailyForecastData: data, loading: false, error: false });
    } catch (error) {
      console.error("Error fetching daily forecast weather data:", error);
      set({ dailyForecastData: null, loading: false, error: true });
    }
  },
  fetchHourlyForecastData: async () => {
    const { lat, long, unitSI } = get();
    set({ loading: true });

    try {
      const data = await fetchHourlyWeatherData({ lat, long }, unitSI);
      set({ hourlyForecastData: data, loading: false, error: false });
    } catch (error) {
      console.error("Error fetching daily forecast weather data:", error);
      set({ hourlyForecastData: null, loading: false, error: true });
    }
  },
}));
