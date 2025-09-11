"use client";

import { useState } from "react";

const searchHistory = ["City name", "City name", "City name", "City name"];

const SearchDropdown = () => {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col gap-y-(--sp-050) rounded-(--radius-12) border border-(--clr-neutral-700) bg-(--clr-neutral-800) p-(--sp-100) lg:w-[32.875rem]">
      {searchHistory.map((history, index) => (
        <span
          key={index}
          className={`cursor-pointer ${active === index ? "rounded-(--radius-8) border border-(--clr-neutral-600) bg-(--clr-neutral-700)" : ""} px-(--sp-100) py-(--sp-125) text-(length:--fs-16) leading-(--lh-120) font-(familiy-name:--font-dm-sans) text-(--clr-neutral-0)`}
          onClick={() => setActive(index)}
        >
          {history}
        </span>
      ))}
    </div>
  );
};

export default SearchDropdown;
