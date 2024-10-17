export type LocationData = {
  latitude: number;
  longitude: number;
};

export const normalizeLocation = (location: LocationData) => {
  const normalizedLatitude = Math.round(
    (location.latitude + 90) * Math.pow(10, 4),
  );
  const normalizedLongitude = Math.round(
    (location.longitude + 180) * Math.pow(10, 4),
  );

  return { latitude: normalizedLatitude, longitude: normalizedLongitude };
};

const ROUND_DECIMALS = 3;

export const roundLocation = (location: LocationData) => {
  const latitude = Math.round(location.latitude * 10**ROUND_DECIMALS) / 10**ROUND_DECIMALS;
  const longitude = Math.round(location.longitude * 10**ROUND_DECIMALS) / 10**ROUND_DECIMALS;
  return { latitude, longitude };
}
