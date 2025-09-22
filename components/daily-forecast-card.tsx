import Image from "next/image";

import { Sunrise, Sunset } from "lucide-react";
import { UVCategory } from "@/lib/utils";

interface DailyForecastCardProps {
  day: string;
  desc: string;
  iconSrc: string;
  values: string[];
  sunrise: string;
  sunset: string;
  uvIndex: UVCategory;
}

/**
 * A component to display a daily forecast card.
 * It takes in a day, description, icon source, sunrise, sunset, uvIndex, and values.
 * It displays the day, icon, and forecast range.
 */
const DailyForecastCard = ({
  day,
  desc,
  iconSrc,
  values,
  sunrise,
  sunset,
  uvIndex,
}: DailyForecastCardProps) => {
  return (
    <div className="flex flex-col gap-y-(--sp-100)">
      <div className="flex w-[6.47875rem] flex-col items-center gap-y-(--sp-200) rounded-(--radius-12) border border-(--clr-neutral-600) bg-(--clr-neutral-800) px-(--sp-125) py-(--sp-200) md:w-[5.57143rem] xl:w-[6.28571rem]">
        {/* day */}
        <span className="text-(length:--fs-24) leading-(--lh-120) font-(familiy-name:--font-dm-sans) text-(--clr-neutral-0)">
          {day}
        </span>
        {/* forecast icon */}
        <Image src={iconSrc} alt={desc} width={60} height={60} />
        {/* forecast range */}
        <div className="flex w-full justify-between">
          <span>{values[0]}</span>
          <span>{values[1]}</span>
        </div>
      </div>
      <div className="flex flex-col gap-y-(--sp-050)">
        {/* sunrise */}
        <div className="flex items-center justify-center gap-x-(--sp-050) rounded-(--radius-12) border border-(--clr-neutral-600) bg-(--clr-neutral-800) p-(--sp-025)">
          <Sunrise size={16} />
          <span className="text-center text-(length:--fs-12) text-(--clr-neutral-0) lg:text-(length:--fs-14)">
            {sunrise}
          </span>
        </div>
        {/* sunset */}
        <div className="flex items-center justify-center gap-x-(--sp-050) rounded-(--radius-12) border border-(--clr-neutral-600) bg-(--clr-neutral-800) p-(--sp-025)">
          <Sunset size={16} />
          <span className="text-center text-(length:--fs-12) text-(--clr-neutral-0) lg:text-(length:--fs-14)">
            {sunset}
          </span>
        </div>
        {/* UV index */}
        <div className="flex flex-col items-center justify-center gap-y-(--sp-050) rounded-(--radius-12) border border-(--clr-neutral-600) bg-(--clr-neutral-800) p-(--sp-050)">
          <span className="text-center text-(length:--fs-12) text-(--clr-neutral-0) lg:text-(length:--fs-14)">
            UV
          </span>
          <span className="text-center text-(length:--fs-12) text-(--clr-neutral-0) lg:text-(length:--fs-14)">
            {uvIndex.level}
          </span>
          <div
            className={`rounded-(--radius-full) ${uvIndex.color} h-[1rem] w-[1rem]`}
          />
        </div>
      </div>
    </div>
  );
};

export default DailyForecastCard;
