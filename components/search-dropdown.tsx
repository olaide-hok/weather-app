"use client";

import { CircleFlag } from "react-circle-flags";

interface Suggestion {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
}

interface SearchDropdownProps {
  suggestions: Suggestion[];
  onSelect: (suggestion: Suggestion) => void;
}

const SearchDropdown = ({ suggestions, onSelect }: SearchDropdownProps) => {
  return (
    <div className="scrollbar absolute top-[4rem] z-10 flex max-h-[11.5rem] w-full flex-col gap-y-(--sp-050) overflow-y-auto rounded-(--radius-12) border border-(--clr-neutral-700) bg-(--clr-neutral-800) p-(--sp-100) md:w-[37rem] lg:w-[32.875rem]">
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className="flex cursor-pointer items-center gap-x-(--sp-100) px-(--sp-100) py-(--sp-125) hover:rounded-(--radius-8) hover:border hover:border-(--clr-neutral-600) hover:bg-(--clr-neutral-700)"
          onClick={() => onSelect(suggestion)}
        >
          <CircleFlag
            countryCode={suggestion.country_code.toLowerCase()}
            className="h-[1.5rem] w-[1.5rem]"
          />
          <span
            className={`text-(length:--fs-16) leading-(--lh-120) font-(familiy-name:--font-dm-sans) text-(--clr-neutral-0)`}
          >
            {suggestion.name}
            {suggestion.country ? `, ${suggestion.country}` : ""}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SearchDropdown;
