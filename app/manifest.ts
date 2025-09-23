import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Weather App",
    short_name: "Weather App",
    description:
      "Weather information by entering a location in the search bar.",
    start_url: "/",
    display: "standalone",
    background_color: "#02012C",
    theme_color: "#ffffff",
    orientation: "portrait",
    icons: [
      {
        src: "/images/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
