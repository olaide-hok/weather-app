"use client";

import { HourlyForecastDataPerDay } from "@/store/weatherStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";

interface HourlyForecastDropdownProps {
  selectedDay: string;
  setSelectedDay: (day: string) => void;
  hourlyForecastDataPerDay: HourlyForecastDataPerDay[] | null;
  loading: boolean;
}

/**
 * A dropdown component to select a day of the week for the hourly forecast.
 *
 * @returns A JSX element displaying a dropdown to select a day of the week.
 */
const HourlyForecastDropdown = ({
  selectedDay,
  setSelectedDay,
  hourlyForecastDataPerDay,
  loading,
}: HourlyForecastDropdownProps) => {
  return (
    <Select value={selectedDay} onValueChange={setSelectedDay}>
      <SelectTrigger
        disabled={loading}
        className={`inline-flex items-center justify-between gap-x-(--sp-075) rounded-(--radius-8) bg-(--clr-neutral-600) px-(--sp-200) py-(--sp-100) text-(length:--fs-16) font-medium text-(--clr-neutral-0) focus:outline-none focus-visible:ring-2 focus-visible:ring-(--clr-neutral-0) ${
          loading ? "cursor-not-allowed opacity-60" : "cursor-pointer"
        }`}
        aria-label="Select day"
      >
        <SelectValue placeholder="Select a day…" />
      </SelectTrigger>

      <SelectContent
        className="right-0 z-20 mt-1 w-[13.375rem] overflow-hidden rounded-(--radius-12) border border-(--clr-neutral-600) bg-(--clr-neutral-800) shadow-[0px_8px_16px_0px_rgba(2,1,44,0.32)]"
        position="popper"
        side="bottom"
        alignOffset={-95}
      >
        <div className="p-(--sp-100)">
          {hourlyForecastDataPerDay?.map((day, index) => (
            <SelectItem
              key={index}
              value={day.day}
              className="relative flex cursor-pointer items-center rounded-(--radius-8) px-(--sp-100) py-(--sp-125) text-(length:--fs-16) text-(--clr-neutral-0) select-none hover:bg-(--clr-neutral-700) focus:bg-(--clr-neutral-700) focus:outline-none"
            >
              {day.day}
            </SelectItem>
          ))}
        </div>
      </SelectContent>
    </Select>
  );
};

export default HourlyForecastDropdown;
