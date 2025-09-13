"use client";

import { useState } from "react";
import { Icons } from "@/components/icons";
import UnitsDropdown from "./units-dropdown";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="flex w-full items-center justify-between">
      {/* logo */}
      <Icons.logo />
      {/* units dropdown */}
      <div className="relative cursor-pointer rounded-(--radius-6) bg-(--clr-neutral-800)">
        <button
          type="button"
          className="flex cursor-pointer items-center gap-x-(--sp-075) px-(--sp-125) py-(--sp-100)"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <Icons.iconUnits />
          <span className="text-(length:--fs-14) leading-(--lh-120) font-medium">
            Units
          </span>
          <Icons.dropdown />
        </button>
        <div
          className={` ${showDropdown ? "block" : "hidden"} absolute top-[3rem] right-0 z-10`}
        >
          <UnitsDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
