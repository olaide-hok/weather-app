"use client";

import { useEffect, useRef, useState } from "react";
import { Icons } from "@/components/icons";
import UnitsDropdown from "./units-dropdown";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="flex w-full items-center justify-between">
      {/* logo */}
      <Icons.logo />
      {/* units dropdown */}
      <div
        ref={dropdownRef}
        className="relative cursor-pointer rounded-(--radius-6) bg-(--clr-neutral-800)"
      >
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
          <UnitsDropdown closeDropdown={() => setShowDropdown(false)} />
        </div>
      </div>
    </header>
  );
};

export default Header;
