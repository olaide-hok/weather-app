"use client";

interface Suggestion {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

interface SearchDropdownProps {
  suggestions: Suggestion[];
  onSelect: (suggestion: Suggestion) => void;
}

const SearchDropdown = ({ suggestions, onSelect }: SearchDropdownProps) => {
  return (
    <div className="absolute top-[4rem] z-10 flex max-h-[11.5rem] flex-col gap-y-(--sp-050) overflow-y-auto rounded-(--radius-12) border border-(--clr-neutral-700) bg-(--clr-neutral-800) p-(--sp-100) lg:w-[32.875rem]">
      {suggestions.map((suggestion, index) => (
        <span
          key={index}
          className={`cursor-pointer px-(--sp-100) py-(--sp-125) text-(length:--fs-16) leading-(--lh-120) font-(familiy-name:--font-dm-sans) text-(--clr-neutral-0) hover:rounded-(--radius-8) hover:border hover:border-(--clr-neutral-600) hover:bg-(--clr-neutral-700)`}
          onClick={() => onSelect(suggestion)}
        >
          {suggestion.name}, {suggestion.country}
        </span>
      ))}
    </div>
  );
};

export default SearchDropdown;
