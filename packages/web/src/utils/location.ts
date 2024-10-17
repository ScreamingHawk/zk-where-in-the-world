export type LocationData = {
  latitude: number;
  longitude: number;
};

const ROUND_DECIMALS = 3;
const ROUNDER = Math.pow(10, ROUND_DECIMALS);

export const locationRangeFix = (location: LocationData) => {
  // Map API is wierd sometimes
  let { latitude, longitude } = location;
  if (longitude < -180) {
    longitude += 360;
  } else if (longitude > 180) {
    longitude -= 360;
  }
  if (latitude < -90) {
    latitude = -90;
  } else if (latitude > 90) {
    latitude = 90;
  }
  return { latitude, longitude };
};

export const normalizeLocation = (location: LocationData) => {
  let { latitude, longitude } = locationRangeFix(location);
  latitude = Math.round((latitude + 90) * ROUNDER);
  longitude = Math.round((longitude + 180) * ROUNDER);
  return { latitude, longitude };
};

export const roundLocation = (location: LocationData) => {
  let { latitude, longitude } = locationRangeFix(location);
  latitude = Math.round(latitude * ROUNDER) / ROUNDER;
  longitude = Math.round(longitude * ROUNDER) / ROUNDER;
  return { latitude, longitude };
};
