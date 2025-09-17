"use client";

import { Icons } from "./icons";
import { units } from "@/data";
import { useWeatherStore } from "@/store/weatherStore";

interface UnitsDropdownProps {
  closeDropdown: () => void;
}

const UnitsDropdown = ({ closeDropdown }: UnitsDropdownProps) => {
  const { unitSI, toggleUnit, loading } = useWeatherStore();

  return (
    <div className="flex w-[11rem] flex-col rounded-(--radius-12) border border-(--clr-neutral-700) bg-(--clr-neutral-800) px-(--sp-075) py-(--sp-075) shadow-[0px_8px_16px_0px_rgba(2,1,44,0.32)] md:px-(--sp-100) lg:w-[13.375rem]">
      <button
        type="button"
        className={`${loading ? "cursor-not-allowed" : "cursor-pointer"} rounded-(--radius-8) px-(--sp-100) py-(--sp-125) text-left text-(length:--fs-16) leading-(--lh-120) font-(familiy-name:--font-dm-sans) text-(--clr-neutral-0) capitalize hover:bg-(--clr-neutral-700)`}
        onClick={() => {
          toggleUnit();
          closeDropdown();
        }}
        disabled={loading}
      >
        Switch to {unitSI === "metric" ? "imperial" : "metric"}
      </button>

      {/* units */}
      <div className="flex w-full flex-col gap-y-(--sp-050)">
        {units.map((unit, index) => (
          <div
            key={index}
            className={`flex flex-col gap-y-(--sp-100) ${index !== units.length - 1 ? "border-b border-(--clr-neutral-600)" : ""} pb-(--sp-050)`}
          >
            <span className="px-(--sp-100) pt-(--sp-075) text-(length:--fs-14) leading-(--lh-120) font-(familiy-name:--font-dm-sans) text-(--clr-neutral-300)">
              {unit.title}
            </span>
            <div className="flex flex-col gap-y-(--sp-050)">
              {unit.options.map((item, index) => (
                <div
                  key={index}
                  className={` ${item.type === unitSI ? "rounded-(--radius-8) bg-(--clr-neutral-700)" : ""} flex w-full items-center justify-between gap-x-(--sp-125) px-(--sp-100) py-(--sp-125)`}
                >
                  <span
                    className={`text-(length:--fs-14) leading-(--lh-120) font-(familiy-name:--font-dm-sans) text-(--clr-neutral-0) md:text-(length:--fs-16)`}
                  >
                    {item.name} {item.symbol}
                  </span>
                  {item.type === unitSI && <Icons.checkmark />}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnitsDropdown;
