"use client";

import Image from "next/image";

interface HourlyForecastTileProps {
  time: string;
  temp: string;
  iconSrc: string;
  desc: string;
  visibility: string;
  surfacePressure: string;
}

/**
 * A component to display a single hour of a hourly weather forecast.
 *
 * @param {string} time - The time of day in 12-hour format.
 * @param {string} temp - The temperature at the given time.
 * @param {string} iconSrc - The URL of the weather icon.
 * @param {string} desc - A human-readable description of the weather condition.
 * @param {string} visibility - The visibility at the given time.
 * @param {string} surfacePressure - The surface pressure at the given time.
 *
 * @returns {JSX.Element} A JSX element displaying the time, temperature, and weather icon.
 */
const HourlyForecastTile = ({
  time,
  temp,
  iconSrc,
  desc,
  visibility,
  surfacePressure,
}: HourlyForecastTileProps) => {
  return (
    <div className="flex flex-col gap-y-(--sp-050) rounded-(--radius-8) border border-(--clr-neutral-600) bg-(--clr-neutral-700)">
      <div className="flex w-full items-center justify-between py-(--sp-125) pr-(--sp-200) pl-(--sp-150)">
        <div className="flex items-center gap-x-(--sp-100)">
          <Image src={iconSrc} alt={desc} width={40} height={40} />
          <span className="text-(length:--fs-20) leading-(--lh-120) font-medium text-(--clr-neutral-0)">
            {time}
          </span>
        </div>

        {/* temp */}
        <span className="text-(length:--fs-16) leading-(--lh-120) font-medium text-(--clr-neutral-0)">
          {temp}
        </span>
      </div>
      <div className="flex w-full justify-between py-(--sp-125) pr-(--sp-200) pl-(--sp-150)">
        {/* visibility */}
        <span className="text-(length:--fs-14) leading-(--lh-120) font-medium text-(--clr-neutral-0)">
          Visibility: {visibility}
        </span>

        {/* surface pressure */}
        <span className="text-(length:--fs-14) leading-(--lh-120) font-medium text-(--clr-neutral-0)">
          Pressure: {surfacePressure}
        </span>
      </div>
    </div>
  );
};

export default HourlyForecastTile;
