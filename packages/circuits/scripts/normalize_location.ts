export type LocationData = {
	latitude: number;
	longitude: number;
};

const ROUND_DECIMALS = 3;
const ROUNDER = Math.pow(10, ROUND_DECIMALS);

export const normalizeLocation = (location: LocationData) => {
  // Normalise the latitude and longitude
  const normalizedLatitude = Math.round((location.latitude + 90) * ROUNDER);
  const normalizedLongitude = Math.round((location.longitude + 180) * ROUNDER);
  return { latitude: normalizedLatitude, longitude: normalizedLongitude };
};

const parseLocation = (location: string) => {
  let latitude, longitude;

  try {
    // Try JSON format first
    const loc = JSON.parse(location);
    latitude = loc.latitude;
    longitude = loc.longitude;
  } catch (error) {
    // Try string format
    [latitude, longitude] = location.split(",").map((value) => {
      return parseFloat(value);
    });
  }
  if (isNaN(latitude) || isNaN(longitude)) {
    console.error(
      'Invalid location format. Please provide the location as an argument. e.g. "-44.698, 169.117"'
    );
		throw new Error('Invalid location format');
  }

	return { latitude, longitude };
};

if (process.argv[1] === import.meta.filename) {
  // Get the location from the command line arguments
  if (process.argv.length < 3) {
    console.error(
      'Please provide the location as an argument. e.g. "-44.6986, 169.1174"'
    );
    process.exit(1);
  }

  const location = process.argv[2];
  const normalized = normalizeLocation(parseLocation(location));

  console.log(JSON.stringify(normalized, null, 2));
}
