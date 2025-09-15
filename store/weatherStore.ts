import { create } from "zustand";
import { fetchCurrentWeatherData } from "@/lib/utils";

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

interface WeatherStoreState {
  unitSI: "metric" | "imperial";
  toggleUnit: () => void;
  cityName: string;
  currentWeatherData: CurrentWeatherData | null;
  lat: number;
  long: number;
  loading: boolean;
  setCityName: (name: string) => void;
  setCoordinates: (lat: number, long: number) => void;
  fetchCurrentWeatherData: () => Promise<void>;
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
  },
  cityName: "Berlin, Germany",
  currentWeatherData: null,
  lat: berlinGermanyCoordinates.lat,
  long: berlinGermanyCoordinates.long,
  loading: false,
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
      set({ currentWeatherData: data, loading: false });
    } catch (error) {
      console.error("Error fetching current weather data:", error);
      set({ currentWeatherData: null, loading: false });
    }
  },
}));
