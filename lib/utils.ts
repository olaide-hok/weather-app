/* eslint-disable @typescript-eslint/no-explicit-any */

import { fetchWeatherApi } from "openmeteo";
import { DailyForecast, HourlyForecastDataPerDay } from "@/store/weatherStore";

const weatherAPIUrl = "https://api.open-meteo.com/v1/forecast";

type FetchedWeatherData = {
  lat: number;
  long: number;
};

// build weather params
function buildWeatherParams(
  { lat, long }: FetchedWeatherData,
  unit: string,
  type: "current" | "daily" | "hourly",
) {
  const common = {
    latitude: lat,
    longitude: long,
  };
  // datasets for current, daily, and hourly
  const datasets: Record<typeof type, string[]> = {
    current: [
      "precipitation",
      "temperature_2m",
      "wind_speed_10m",
      "relative_humidity_2m",
      "apparent_temperature",
    ],
    daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
    hourly: ["weather_code", "temperature_2m"],
  };
  // unit overrides
  const unitOverrides =
    unit !== "metric"
      ? {
          wind_speed_unit: "mph",
          temperature_unit: "fahrenheit",
          precipitation_unit: "inch",
        }
      : {};

  return {
    ...common,
    [type]: datasets[type],
    ...unitOverrides,
  };
}

// Fetch current weather data using OpenMeteo API.
export async function fetchCurrentWeatherData(
  { lat, long }: FetchedWeatherData,
  unit: string,
) {
  const params = buildWeatherParams({ lat, long }, unit, "current");
  // Fetch data from Open Meteo API
  const responses = await fetchWeatherApi(weatherAPIUrl, params);
  // Process first location.
  const response = responses[0];
  // Attribute for timezone
  const utcOffsetSeconds = response.utcOffsetSeconds();
  // Attributes for current
  const current = response.current()!;

  const date = new Date((Number(current.time()) + utcOffsetSeconds) * 1000);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long", // e.g. "Tuesday"
    month: "short", // e.g. "Sept"
    day: "numeric", // e.g. "4"
    year: "numeric", // e.g. "2025"
  }).format(date);

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    current: {
      time: formattedDate,
      precipitation: current.variables(0)!.value(),
      temperature_2m: current.variables(1)!.value(),
      wind_speed_10m: current.variables(2)!.value(),
      relative_humidity_2m: current.variables(3)!.value(),
      apparent_temperature: current.variables(4)!.value(),
    },
  };

  return weatherData.current;
}

// map WMO weather codes to description + icons
const weatherCodeMap: Record<number, { desc: string; iconSrc: string }> = {
  // Clear sky
  0: { desc: "Clear Sky", iconSrc: "/images/icon-sunny.webp" },

  // Mainly clear, partly cloudy, overcast
  1: { desc: "Mainly Clear", iconSrc: "/images/icon-partly-cloudy.webp" },
  2: { desc: "Partly Cloudy", iconSrc: "/images/icon-partly-cloudy.webp" },
  3: { desc: "Overcast", iconSrc: "/images/icon-partly-cloudy.webp" },

  // Fog and depositing rime fog
  45: { desc: "Fog", iconSrc: "/images/icon-fog.webp" },
  48: { desc: "Rime Fog", iconSrc: "/images/icon-fog.webp" },

  // Drizzle
  51: { desc: "Light Drizzle", iconSrc: "/images/icon-drizzle.webp" },
  53: { desc: "Moderate Drizzle", iconSrc: "/images/icon-drizzle.webp" },
  55: { desc: "Dense Drizzle", iconSrc: "/images/icon-drizzle.webp" },

  // Freezing drizzle
  56: { desc: "Light Freezing Drizzle", iconSrc: "/images/icon-drizzle.webp" },
  57: { desc: "Dense Freezing Drizzle", iconSrc: "/images/icon-drizzle.webp" },

  // Rain
  61: { desc: "Slight Rain", iconSrc: "/images/icon-rain.webp" },
  63: { desc: "Moderate Rain", iconSrc: "/images/icon-rain.webp" },
  65: { desc: "Heavy Rain", iconSrc: "/images/icon-rain.webp" },

  // Freezing rain
  66: { desc: "Light Freezing Rain", iconSrc: "/images/icon-rain.webp" },
  67: { desc: "Heavy Freezing Rain", iconSrc: "/images/icon-rain.webp" },

  // Snow fall
  71: { desc: "Slight Snow Fall", iconSrc: "/images/icon-snow.webp" },
  73: { desc: "Moderate Snow Fall", iconSrc: "/images/icon-snow.webp" },
  75: { desc: "Heavy Snow Fall", iconSrc: "/images/icon-snow.webp" },

  // Snow grains
  77: { desc: "Snow Grains", iconSrc: "/images/icon-snow.webp" },

  // Rain showers
  80: { desc: "Slight Rain Showers", iconSrc: "/images/icon-rain.webp" },
  81: { desc: "Moderate Rain Showers", iconSrc: "/images/icon-rain.webp" },
  82: { desc: "Violent Rain Showers", iconSrc: "/images/icon-rain.webp" },

  // Snow showers
  85: { desc: "Slight Snow Showers", iconSrc: "/images/icon-snow.webp" },
  86: { desc: "Heavy Snow Showers", iconSrc: "/images/icon-snow.webp" },

  // Thunderstorm
  95: { desc: "Thunderstorm", iconSrc: "/images/icon-storm.webp" }, // slight/moderate
  96: {
    desc: "Thunderstorm with Slight Hail",
    iconSrc: "/images/icon-storm.webp",
  },
  99: {
    desc: "Thunderstorm with Heavy Hail",
    iconSrc: "/images/icon-storm.webp",
  },
};

// format the daily forecast data from the Open Meteo Weather API.
export function formatDailyForecast(apiResponse: any): DailyForecast[] {
  const { time, weather_code, temperature_2m_max, temperature_2m_min } =
    apiResponse;

  const formatted = time.map((t: string, index: number) => {
    const code = weather_code[index];
    const { desc, iconSrc } = weatherCodeMap[code];

    return {
      day: new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
        new Date(t),
      ),
      desc,
      iconSrc,
      values: [
        `${Math.round(temperature_2m_max[index])}°`,
        `${Math.round(temperature_2m_min[index])}°`,
      ],
    };
  });

  return formatted;
}

// fetch Daily Forecast Weather Data
export async function fetchDailyWeatherData(
  { lat, long }: FetchedWeatherData,
  unit: string,
) {
  const params = buildWeatherParams({ lat, long }, unit, "daily");
  // Fetch data from Open Meteo API
  const responses = await fetchWeatherApi(weatherAPIUrl, params);
  // Process first location.
  const response = responses[0];
  // Attributes for timezone
  const utcOffsetSeconds = response.utcOffsetSeconds();
  // Attributes for daily
  const daily = response.daily()!;
  // Weather data
  const weatherData = {
    daily: {
      time: [
        ...Array(
          (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval(),
        ),
      ].map(
        (_, i) =>
          new Date(
            (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
              1000,
          ),
      ),
      weather_code: daily.variables(0)!.valuesArray(),
      temperature_2m_max: daily.variables(1)!.valuesArray(),
      temperature_2m_min: daily.variables(2)!.valuesArray(),
    },
  };
  // Format data for daily forecast card
  const dailyForecastData = formatDailyForecast(weatherData.daily);
  return dailyForecastData;
}

type HourlyForecastWithDay = {
  time: string;
  description: string;
  iconSrc: string;
  temp: string;
  day: string;
};

// format Open Meteo API response hourly data into per-hour structure.
export function formatHourlyForecast(
  apiResponse: any,
): HourlyForecastWithDay[] {
  const { time, weather_code, temperature_2m } = apiResponse;

  const hourlyForecastData = time.map((time: Date, index: number) => {
    const code = weather_code[index];
    const temp = temperature_2m[index];
    const { desc, iconSrc } = weatherCodeMap[code];

    return {
      time: new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        hour12: true,
      }).format(time), // e.g., "3 PM"
      description: desc,
      iconSrc,
      temp: `${Math.round(temp)}°`,
      day: new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(time), // "Monday"
    };
  });

  return hourlyForecastData;
}

// group data by day of the week
function groupHourlyForecastByDay(
  data: HourlyForecastWithDay[],
): HourlyForecastDataPerDay[] {
  const hourlyForecastDataPerDay = data.reduce((acc, curr) => {
    const existing = acc.find((d) => d.day === curr.day);
    if (existing) {
      existing.data.push({
        time: curr.time,
        description: curr.description,
        iconSrc: curr.iconSrc,
        temp: curr.temp,
      });
    } else {
      acc.push({
        day: curr.day,
        data: [
          {
            time: curr.time,
            description: curr.description,
            iconSrc: curr.iconSrc,
            temp: curr.temp,
          },
        ],
      });
    }
    return acc;
  }, [] as HourlyForecastDataPerDay[]);

  return hourlyForecastDataPerDay;
}

// fetch Hourly Forecast Weather Data
export async function fetchHourlyWeatherData(
  { lat, long }: FetchedWeatherData,
  unit: string,
) {
  const params = buildWeatherParams({ lat, long }, unit, "hourly");
  // Fetch data from Open Meteo API
  const responses = await fetchWeatherApi(weatherAPIUrl, params);

  // Process first location.
  const response = responses[0];

  // Attributes for timezone
  const utcOffsetSeconds = response.utcOffsetSeconds();
  // Attributes for hourly forecast
  const hourly = response.hourly()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    hourly: {
      time: [
        ...Array(
          (Number(hourly.timeEnd()) - Number(hourly.time())) /
            hourly.interval(),
        ),
      ].map(
        (_, i) =>
          new Date(
            (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
              1000,
          ),
      ),
      weather_code: hourly.variables(0)!.valuesArray(),
      temperature_2m: hourly.variables(1)!.valuesArray(),
    },
  };

  // Format data for hourly forecast
  const hourlyForecastData = formatHourlyForecast(weatherData.hourly);
  const hourlyForecastDataPerDay = groupHourlyForecastByDay(hourlyForecastData);
  return hourlyForecastDataPerDay;
}
