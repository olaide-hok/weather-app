import DailyForecastCard from "@/components/daily-forecast-card";
import HourlyForecastTile from "@/components/hourly-forecast-tile";
import { Icons } from "@/components/icons";
import SearchBar from "@/components/search-bar";
import THWPContainer from "@/components/thwp-container";
import { dailyForecastData, hourlyForecastData, thwpData } from "@/data";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex w-[23.4375rem] flex-col items-center px-(--sp-200) pt-(--sp-200) pb-(--sp-600) md:w-full md:px-(--sp-300) md:pt-(--sp-300) md:pb-(--sp-1000) lg:px-(--sp-1400) lg:py-(--sp-600) 2xl:max-w-[90rem]">
      {/* header */}
      <header className="flex w-full items-center justify-between">
        {/* logo */}
        <Icons.logo />
        {/* units dropdown */}
        <div className="relative cursor-pointer rounded-(--radius-6) bg-(--clr-neutral-800)">
          <div className="flex items-center gap-x-(--sp-075) px-(--sp-125) py-(--sp-100)">
            <Icons.iconUnits />
            <span className="text-(length:--fs-14) leading-(--lh-120) font-medium">
              Units
            </span>
            <Icons.dropdown />
          </div>
        </div>
      </header>
      {/* hero */}
      <section className="mt-(--sp-600) flex w-full flex-col gap-y-(--sp-600)">
        <h1 className="font-bricolage-grotesque text-center text-[3.25rem] leading-(--lh-120) font-bold text-(--clr-neutral-0)">
          How&apos;s the sky looking today?
        </h1>
        {/* search bar */}
        <SearchBar />
      </section>
      {/* features */}
      <section className="mt-(--sp-400) flex w-full flex-col gap-(--sp-400) lg:flex-row">
        <div className="flex w-full flex-col gap-y-(--sp-250) md:gap-y-(--sp-400) lg:flex-2">
          {/* today bg */}
          <div className="bg_today flex w-full flex-col items-center justify-center gap-y-(--sp-200) rounded-(--radius-20) md:flex-row md:px-(--sp-300) lg:justify-between">
            {/* city name and date */}
            <div className="flex w-full flex-col items-center gap-y-(--sp-150) md:items-start">
              <h2 className="text-(length:--fs-28) leading-(--lh-120) font-bold text-(--clr-neutral-0)">
                Berlin, Germany
              </h2>
              <p className="text-(length:--fs-18) leading-(--lh-120) font-medium text-(--clr-neutral-0)/80">
                Tuesday, Aug 4, 2025
              </p>
            </div>
            {/* cloud and temp value */}
            <div className="flex w-full items-center justify-center gap-x-(--sp-250) md:justify-end">
              <Image
                src="/images/icon-sunny.webp"
                alt="sunny"
                height={120}
                width={120}
              />
              <p className="text-[6rem] font-semibold tracking-[-0.12rem] text-(--clr-neutral-0) italic">
                20°
              </p>
            </div>
          </div>
          {/* thwp containers */}
          <div className="grid grid-cols-2 gap-(--sp-200) md:grid-cols-4">
            {thwpData.map((item, index) => (
              <THWPContainer
                key={index}
                title={item.title}
                value={item.value}
              />
            ))}
          </div>
          {/* daily forecast */}
          <div className="flex flex-col gap-y-(--sp-250)">
            <h3 className="text-(length:--fs-18) leading-(--lh-120) font-semibold text-(--clr-neutral-0)">
              Daily forecast
            </h3>
            <div className="grid grid-cols-3 gap-(--sp-200) md:grid-cols-7">
              {dailyForecastData.map((item, index) => (
                <DailyForecastCard
                  key={index}
                  day={item.day}
                  desc={item.desc}
                  iconSrc={item.iconSrc}
                  values={item.values}
                />
              ))}
            </div>
          </div>
        </div>
        {/* hourly forecast */}
        <div className="flex w-full flex-col gap-y-(--sp-200) rounded-(--radius-20) bg-(--clr-neutral-800) px-(--sp-200) py-(--sp-250) lg:flex-1">
          <div className="flex w-full items-center justify-between">
            <span className="text-(length:--fs-20) leading-(--lh-120) font-semibold text-(--clr-neutral-0)">
              Hourly forecast
            </span>

            <div className="relative cursor-pointer rounded-(--radius-8) bg-(--clr-neutral-600) px-(--sp-200) py-(--sp-100)">
              <div className="flex items-center gap-x-(--sp-075)">
                <span className="text-(length:--fs-16) leading-normal font-medium text-(--clr-neutral-0)">
                  Tuesday
                </span>
                <Icons.dropdown />
              </div>
            </div>
          </div>
          {/* hourly forecast tiles */}
          {hourlyForecastData.map((item, index) => (
            <HourlyForecastTile
              key={index}
              time={item.time}
              temp={item.temp}
              iconSrc={item.iconSrc}
              desc={item.description}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
