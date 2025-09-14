"use client";

import { days } from "@/data";

interface DaysDropdownProps {
  selectedDay: string;
  selectDay: (day: string) => void;
}

const DaysDropdown = ({ selectedDay, selectDay }: DaysDropdownProps) => {
  return (
    <div className="flex flex-col gap-y-(--sp-050) rounded-(--radius-12) border border-(--clr-neutral-600) bg-(--clr-neutral-800) p-(--sp-100) shadow-[0px_8px_16px_0px_rgba(2,1,44,0.32)] lg:w-[13.375rem]">
      {days.map((day, index) => (
        <p
          key={index}
          className={`cursor-pointer ${day === selectedDay ? "rounded-(--radius-8) bg-(--clr-neutral-700)" : ""} px-(--sp-100) py-(--sp-125) text-(length:--fs-16) leading-(--lh-120) font-(familiy-name:--font-dm-sans) text-(--clr-neutral-0) hover:bg-(--clr-neutral-700)`}
          onClick={() => selectDay(day)}
        >
          {day}
        </p>
      ))}
    </div>
  );
};

export default DaysDropdown;
