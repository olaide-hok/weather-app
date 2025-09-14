import { create } from "zustand";

interface WeatherStoreState {
  unitSI: "metric" | "imperial";
  toggleUnit: () => void;
}

export const useWeatherStore = create<WeatherStoreState>((set, get) => ({
  unitSI: "metric",
  toggleUnit: () =>
    set({
      unitSI: get().unitSI === "metric" ? "imperial" : "metric",
    }),
}));
