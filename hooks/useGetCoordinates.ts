import useSWR from "swr";

const geocodingAPIUrl = "https://geocoding-api.open-meteo.com/v1/search";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

/**
 * Fetch geocoding data using the Open-Meteo Geocoding API
 * and return the data, loading state, and error state.
 *
 * @param {string} place - Place to search for geocoding data.
 * @returns {Object} - Object with geocodeData, isLoading, and isError properties.
 * @property {Object[]} geocodeData - Geocoding data.
 * @property {boolean} isLoading - Loading state.
 * @property {Error} isError - Error state.
 */
export default function useGetCoordinates(place: string) {
  const { data, error, isLoading } = useSWR(
    place
      ? `${geocodingAPIUrl}?name=${encodeURIComponent(
          place,
        )}&count=10&language=en&format=json`
      : null,
    fetcher,
  );

  return {
    geocodeData: data,
    isLoading,
    isError: error,
  };
}

type OpenMeteoResponse = {
  results?: Array<{
    name: string;
    country?: string;
    latitude: number;
    longitude: number;
  }>;
};

const nominatimReverseBase =
  "https://nominatim.openstreetmap.org/reverse?format=jsonv2";

export function useGetCoordinatesNomatim(
  coords?: { lat: number; long: number } | null,
) {
  const url = coords
    ? `${nominatimReverseBase}&lat=${encodeURIComponent(
        String(coords.lat),
      )}&lon=${encodeURIComponent(String(coords.long))}&accept-language=en`
    : null;

  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    geocodeData: data?.address || null,
    isLoading,
    isError: !!error,
    error,
  };
}
