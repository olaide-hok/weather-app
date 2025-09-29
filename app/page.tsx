"use client";

import APIError from "@/components/api-error";
import DailyForecastCard from "@/components/daily-forecast-card";
import Header from "@/components/header";
import { HeroLoading } from "@/components/hero-loading";
import HourlyForecastDropdown from "@/components/hourly-forecast-dropdown";
import HourlyForecastTile from "@/components/hourly-forecast-tile";
import SearchBar from "@/components/search-bar";
import { Skeleton } from "@/components/skeleton";
import THWPContainer from "@/components/thwp-container";
import { thwpData } from "@/data";
import { detectUserLocation } from "@/lib/utils";
import { useWeatherStore } from "@/store/weatherStore";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const fetchCurrentWeatherData = useWeatherStore(
    (state) => state.fetchCurrentWeatherData,
  );
  const fetchDailyForecast = useWeatherStore(
    (state) => state.fetchDailyForecastData,
  );
  const fetchHourlyForecast = useWeatherStore(
    (state) => state.fetchHourlyForecastData,
  );

  const {
    loading,
    unitSI: unit,
    cityName,
    currentWeatherData,
    dailyForecastData,
    hourlyForecastData,
    error: apiError,
    noResultFound,
    setCoordinates,
    setCityName,
  } = useWeatherStore();

  useEffect(() => {
    async function init() {
      const pos = await detectUserLocation();
      if (pos) {
        setCoordinates(pos.lat, pos.long);
        setCityName(pos.cityName);
        fetchCurrentWeatherData();
        fetchDailyForecast();
        fetchHourlyForecast();
      } else {
        // Default to Berlin, Germany if user doesn't allow location
        setCoordinates(52.52, 13.419998);
        setCityName("Berlin, Germany");
        fetchCurrentWeatherData();
        fetchDailyForecast();
        fetchHourlyForecast();
      }
    }
    init();
  }, []);

  // get today's weekday name (e.g., "Tuesday")
  const today = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    new Date(),
  );

  const [selectedDay, setSelectedDay] = useState(today);
  const selectedData = hourlyForecastData?.find((d) => d.day === selectedDay);

  return (
    <main className="flex w-[23.4375rem] flex-col items-center justify-self-center px-(--sp-200) pt-(--sp-200) pb-(--sp-600) md:w-full md:px-(--sp-300) md:pt-(--sp-300) md:pb-(--sp-1000) lg:px-(--sp-1400) lg:py-(--sp-600) 2xl:max-w-[90rem]">
      {/* header */}
      <Header />
      {apiError ? (
        <APIError />
      ) : (
        <>
          {/* hero */}
          <section className="mt-(--sp-600) flex w-full flex-col items-center gap-y-(--sp-600) xl:mt-(--sp-800) xl:gap-y-(--sp-800)">
            <h1 className="font-bricolage-grotesque text-center text-[3.25rem] leading-(--lh-120) font-bold text-(--clr-neutral-0)">
              How&apos;s the sky looking today?
            </h1>
            {/* search bar */}
            <SearchBar />
          </section>
          {noResultFound ? (
            <div className="mt-(--sp-600)">
              <h4 className="text-center text-(length:--fs-28) leading-(--lh-120) font-bold text-(--clr-neutral-0)">
                No search result found!
              </h4>
            </div>
          ) : (
            <section className="mt-(--sp-400) flex w-full flex-col gap-(--sp-400) lg:flex-row">
              <div className="flex w-full flex-col gap-y-(--sp-250) md:gap-y-(--sp-400) lg:flex-2">
                {/* today bg */}
                {loading ? (
                  <HeroLoading />
                ) : (
                  <div className="bg_today flex w-full flex-col items-center justify-center gap-y-(--sp-200) rounded-(--radius-20) md:flex-row md:px-(--sp-300) lg:justify-between">
                    {/* city name and date */}
                    <div className="flex w-full flex-col items-center gap-y-(--sp-150) md:items-start">
                      <h2 className="text-(length:--fs-28) leading-(--lh-120) font-bold text-(--clr-neutral-0)">
                        {cityName}
                      </h2>
                      <p className="text-(length:--fs-18) leading-(--lh-120) font-medium text-(--clr-neutral-0)/80">
                        {currentWeatherData?.time}
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
                        {currentWeatherData?.temperature_2m.toFixed(0)}°
                      </p>
                    </div>
                  </div>
                )}
                {loading ? (
                  <div className="grid grid-cols-2 gap-(--sp-200) md:grid-cols-4">
                    {thwpData.map(({ title, value }, index) => (
                      <Skeleton
                        key={index}
                        className="flex h-[7.375rem] w-full animate-pulse flex-col gap-y-(--sp-300) rounded-(--radius-12) border border-(--clr-neutral-600) bg-(--clr-neutral-800) p-(--sp-250) md:h-[10.375rem]"
                      >
                        <span className="text-(length:--fs-18) leading-(--lh-120) font-medium text-(--clr-neutral-200)">
                          {title}
                        </span>
                        <span className="text-(length:--fs-32) font-light text-(--clr-neutral-0)">
                          {value}
                        </span>
                      </Skeleton>
                    ))}
                  </div>
                ) : (
                  <>
                    {/* thwp containers */}
                    {currentWeatherData && (
                      <div className="grid grid-cols-2 gap-(--sp-200) md:grid-cols-4">
                        {/* Feels Like */}
                        <THWPContainer
                          title="Feels Like"
                          value={`${currentWeatherData?.apparent_temperature.toFixed(0)}°`}
                          unit=""
                        />

                        {/* Humidity */}
                        <THWPContainer
                          title="Humidity"
                          value={`${currentWeatherData?.relative_humidity_2m.toFixed(
                            0,
                          )}%`}
                          unit=""
                        />

                        {/* Wind */}
                        <THWPContainer
                          title="Wind"
                          value={currentWeatherData?.wind_speed_10m.toFixed(0)}
                          unit={unit === "metric" ? "km/h" : "mph"}
                        />

                        {/* Precipitation */}
                        <THWPContainer
                          title="Precipitation"
                          value={currentWeatherData?.precipitation.toFixed(0)}
                          unit={unit === "metric" ? "mm" : "in"}
                        />
                      </div>
                    )}
                  </>
                )}
                {/* daily forecast */}
                <div className="flex flex-col gap-y-(--sp-250)">
                  <h2 className="text-(length:--fs-18) leading-(--lh-120) font-semibold text-(--clr-neutral-0)">
                    Daily forecast
                  </h2>
                  <div className="grid grid-cols-3 gap-(--sp-200) md:grid-cols-7">
                    {loading
                      ? Array.from({ length: 7 }, (_, index) => (
                          <div
                            key={index}
                            className="flex flex-col gap-y-(--sp-050)"
                          >
                            <Skeleton className="h-[10.3125rem] w-[6.47875rem] animate-pulse rounded-(--radius-12) bg-(--clr-neutral-800) md:w-[5.57143rem] xl:w-[6.28571rem]" />
                            <Skeleton className="h-[1.8125rem] w-[6.47875rem] animate-pulse rounded-(--radius-12) bg-(--clr-neutral-800) md:w-[5.57143rem] xl:w-[6.28571rem]" />
                            <Skeleton className="h-[1.8125rem] w-[6.47875rem] animate-pulse rounded-(--radius-12) bg-(--clr-neutral-800) md:w-[5.57143rem] xl:w-[6.28571rem]" />
                            <Skeleton className="h-[4.875rem] w-[6.47875rem] animate-pulse rounded-(--radius-12) bg-(--clr-neutral-800) md:w-[5.57143rem] xl:w-[6.28571rem]" />
                          </div>
                        ))
                      : dailyForecastData?.map((item, index) => (
                          <DailyForecastCard
                            key={index}
                            day={item.day}
                            desc={item.desc}
                            iconSrc={item.iconSrc}
                            values={item.values}
                            sunrise={item.sunrise}
                            sunset={item.sunset}
                            uvIndex={item.uvIndex}
                          />
                        ))}
                  </div>
                </div>
              </div>
              {/* hourly forecast */}
              <div className="flex h-[41.8125rem] w-full flex-col gap-y-(--sp-200) rounded-(--radius-20) bg-(--clr-neutral-800) px-(--sp-200) py-(--sp-250) md:h-[54.5rem] lg:flex-1">
                <div className="flex w-full items-center justify-between">
                  <span className="text-(length:--fs-20) leading-(--lh-120) font-semibold text-(--clr-neutral-0)">
                    Hourly forecast
                  </span>
                  <HourlyForecastDropdown
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                    hourlyForecastDataPerDay={hourlyForecastData}
                    loading={loading}
                  />
                </div>
                {/* hourly forecast tiles */}
                {loading ? (
                  Array.from({ length: 8 }, (_, index) => (
                    <Skeleton
                      key={index}
                      className="h-[6.425rem] w-full bg-(--clr-neutral-700)"
                    />
                  ))
                ) : (
                  <div className="scrollbar flex h-full flex-col gap-y-(--sp-200) overflow-y-auto pr-(--sp-100)">
                    {selectedData?.data?.map((item, index) => (
                      <HourlyForecastTile
                        key={index}
                        time={item.time}
                        temp={item.temp}
                        iconSrc={item.iconSrc}
                        desc={item.description}
                        visibility={item.visibility}
                        surfacePressure={item.surfacePressure}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
}
