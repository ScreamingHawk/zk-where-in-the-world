import { poseidon2 } from 'poseidon-lite'

// Get the location from the command line arguments
if (process.argv.length < 3) {
		console.error("Please provide the normalized location as an argument. e.g. \"453014, 3491174\"");
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
if (!Number.isInteger(latitude) || !Number.isInteger(longitude)) {
	console.error("Invalid location format. Please provide the normalized location as an argument. e.g. \"453014, 3491174\"");
	process.exit(1);
}

const hash = poseidon2([latitude, longitude]);
const hashHex = hash.toString(16);
console.log(`0x${hashHex.padStart(64, '0')}`);
