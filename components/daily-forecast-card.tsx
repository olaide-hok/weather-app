import Image from "next/image";
import { Skeleton } from "./skeleton";

interface DailyForecastCardProps {
  day: string;
  desc: string;
  iconSrc: string;
  values: string[];
  loading: boolean;
}

/**
 * A component to display a daily forecast card.
 * It takes in a day, description, icon source, loading, and values.
 * It displays the day, icon, and forecast range.
 */
const DailyForecastCard = ({
  day,
  desc,
  iconSrc,
  values,
  loading,
}: DailyForecastCardProps) => {
  if (loading) {
    return (
      <Skeleton className="h-[10.3125rem] w-full rounded-(--radius-12) bg-(--clr-neutral-800)" />
    );
  }

  return (
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
  );
};

export default DailyForecastCard;
