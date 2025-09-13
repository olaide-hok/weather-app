"use client";

import { useState } from "react";
import { Icons } from "./icons";
import DaysDropdown from "./days-dropdown";

/**
 * A dropdown component to select a day of the week for the hourly forecast.
 *
 * @returns A JSX element displaying a dropdown to select a day of the week.
 */
const HourlyForecastDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Monday");

  const handleDayClick = (day: string) => {
    setSelectedDay(day);
    setShowDropdown(false);
  };

  return (
    <div className="relative cursor-pointer rounded-(--radius-8) bg-(--clr-neutral-600) px-(--sp-200) py-(--sp-100)">
      <button
        type="button"
        className="flex items-center gap-x-(--sp-075)"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span className="text-(length:--fs-16) leading-normal font-medium text-(--clr-neutral-0)">
          {selectedDay}
        </span>
        <Icons.dropdown />
      </button>
      <div
        className={` ${showDropdown ? "block" : "hidden"} absolute top-[3rem] right-0 z-10`}
      >
        <DaysDropdown selectedDay={selectedDay} selectDay={handleDayClick} />
      </div>
    </div>
  );
};

export default HourlyForecastDropdown;
