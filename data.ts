export const thwpData = [
  {
    title: "Feels Like",
    value: "18°",
  },
  {
    title: "Humidity",
    value: "46%",
  },
  {
    title: "Wind",
    value: "14 km/h",
  },
  {
    title: "Precipitation",
    value: "0 mm",
  },
];

export const dailyForecastData = [
  {
    day: "Tue",
    desc: "Rain",
    iconSrc: "/images/icon-rain.webp",
    values: ["20°", "14°"],
  },
  {
    day: "Wed",
    desc: "Drizzle",
    iconSrc: "/images/icon-drizzle.webp",
    values: ["21°", "15°"],
  },
  {
    day: "Thu",
    desc: "Sunny",
    iconSrc: "/images/icon-sunny.webp",
    values: ["24°", "14°"],
  },
  {
    day: "Fri",
    desc: "Partly Cloudy",
    iconSrc: "/images/icon-partly-cloudy.webp",
    values: ["25°", "13°"],
  },
  {
    day: "Sat",
    desc: "Storm",
    iconSrc: "/images/icon-storm.webp",
    values: ["21°", "15°"],
  },
  {
    day: "Sun",
    desc: "Snow",
    iconSrc: "/images/icon-snow.webp",
    values: ["25°", "16°"],
  },
  {
    day: "Mon",
    desc: "Fog",
    iconSrc: "/images/icon-fog.webp",
    values: ["24°", "15°"],
  },
];

export const hourlyForecastData = [
  {
    time: "3 PM",
    description: "Overcast",
    iconSrc: "/images/icon-overcast.webp",
    temp: "20°",
  },
  {
    time: "4 PM",
    description: "Partly Cloudy",
    iconSrc: "/images/icon-partly-cloudy.webp",
    temp: "20°",
  },
  {
    time: "5 PM",
    description: "Sunny",
    iconSrc: "/images/icon-sunny.webp",
    temp: "20°",
  },
  {
    time: "6 PM",
    description: "Overcast",
    iconSrc: "/images/icon-overcast.webp",
    temp: "19°",
  },
  {
    time: "7 PM",
    description: "Snow",
    iconSrc: "/images/icon-snow.webp",
    temp: "18°",
  },
  {
    time: "8 PM",
    description: "Fog",
    iconSrc: "/images/icon-fog.webp",
    temp: "18°",
  },
  {
    time: "9 PM",
    description: "Snow",
    iconSrc: "/images/icon-snow.webp",
    temp: "17°",
  },
  {
    time: "10 PM",
    description: "Overcast",
    iconSrc: "/images/icon-overcast.webp",
    temp: "17°",
  },
];

export const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const temp = [
  {
    name: "Celsius",
    symbol: "(°C)",
    type: "metric",
  },
  {
    name: "Fahrenheit",
    symbol: "(°F)",
    type: "imperial",
  },
];

const windSpeed = [
  {
    name: "km/h",
    symbol: "",
    type: "metric",
  },
  {
    name: "mph",
    symbol: "",
    type: "imperial",
  },
];

const precipitation = [
  {
    name: "Millimeters",
    symbol: "mm",
    type: "metric",
  },
  {
    name: "Inches",
    symbol: "(in)",
    type: "imperial",
  },
];

export const units = [
  {
    title: "Temperature",
    options: temp,
  },
  {
    title: "Wind Speed",
    options: windSpeed,
  },
  {
    title: "Precipitation",
    options: precipitation,
  },
];
