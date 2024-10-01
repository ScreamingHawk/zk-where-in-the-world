// Get the location from the command line arguments
if (process.argv.length < 3) {
		console.error("Please provide the location as an argument. e.g. \"-44.6986, 169.1174\"");
		process.exit(1);
}

const location = process.argv[2];

let latitude, longitude;

try {
	// Try JSON format first
	const loc = JSON.parse(location);
	latitude = loc.latitude;
	longitude = loc.longitude;
} catch (error) {
	// Try string format
	[latitude, longitude] = location.split(',').map((value) => {
		return parseFloat(value);
	});
}
if (isNaN(latitude) || isNaN(longitude)) {
	console.error("Invalid location format. Please provide the location as an argument. e.g. \"-44.6986, 169.1174\"");
	process.exit(1);
}

// Normalise the latitude and longitude
const normalizedLatitude = Math.round((latitude + 90) * Math.pow(10, 4));
const normalizedLongitude = Math.round((longitude + 180) * Math.pow(10, 4));

console.log(JSON.stringify({ latitude: normalizedLatitude, longitude: normalizedLongitude }, null, 2));
