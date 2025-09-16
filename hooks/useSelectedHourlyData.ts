import { useEffect, useState } from "react";
import { HourlyForecastDataPerDay } from "@/store/weatherStore";

/**
 * Returns the selected hourly forecast data based on the current day and time.
 * When the component mounts, it computes the selected hourly forecast data immediately.
 * Then, every hour when the tab is visible, it updates the selected hourly forecast data.
 * When the tab is not visible or unmounted, it stops updating the selected hourly forecast data.
 *
 * @param {HourlyForecastDataPerDay[]} hourlyForecastDataPerDay - the hourly forecast data per day
 * @param {string} selectedDay - the selected day of the week
 * @returns {HourlyForecastDataPerDay | null} - the selected hourly forecast data or null if no data is found
 */
export default function useSelectedHourlyData(
  hourlyForecastDataPerDay: HourlyForecastDataPerDay[],
  selectedDay: string,
) {
  const [selectedData, setSelectedData] = useState<HourlyForecastDataPerDay>(
    {} as HourlyForecastDataPerDay,
  );

  const computeSelectedData = () => {
    const dayData = hourlyForecastDataPerDay.find((d) => d.day === selectedDay);
    if (!dayData) return null;

    const now = new Date();
    const currentHour = now.getHours();

    // Find the index of the matching forecast hour
    const startIndex = dayData.data.findIndex((item) => {
      // item.time is like "2 PM", "3 PM", etc.
      const [num, ampm] = item.time.split(" ");
      let hour = parseInt(num, 10);
      if (ampm === "PM" && hour !== 12) hour += 12;
      if (ampm === "AM" && hour === 12) hour = 0;
      return hour === currentHour;
    });

    const safeStart = startIndex >= 0 ? startIndex : 0;

    return {
      ...dayData,
      data: dayData.data.slice(safeStart, safeStart + 8),
    };
  };

  useEffect(() => {
    // compute immediately on mount
    const update = () => {
      setSelectedData((prevSelectedData) => {
        const newData = computeSelectedData();
        return newData ?? prevSelectedData;
      });
    };

    let interval: NodeJS.Timeout;
    // update every hour when tab visible
    const start = () => {
      update(); // run immediately
      interval = setInterval(update, 60 * 60 * 1000); // every hour
    };
    // stop interval when tab not visible or unmount
    const stop = () => {
      if (interval) clearInterval(interval);
    };

    // recompute + restart interval when tab visible
    const handleVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        start(); // recompute + restart interval when tab visible
      }
    };
    // start interval
    start();
    // listen for visibility changes
    document.addEventListener("visibilitychange", handleVisibility);

    // cleanup
    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [hourlyForecastDataPerDay, selectedDay]);

  return selectedData;
}
