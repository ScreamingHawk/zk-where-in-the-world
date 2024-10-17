import fs from 'fs';
import { normalizeLocation, type LocationData } from './normalize_location';
import { hashLocation } from './hash_locations';

// Clear folder at "inputs/location" using node

const OUTPUT_FOLDER = 'inputs/location';
const INPUT_FILE = "../../images/data.json";
const METADATA_FOLDER = 'metadata';

// Clear the output and metadata folders
for (const path of [OUTPUT_FOLDER, METADATA_FOLDER]) {
	fs.rmdirSync(path, { recursive: true });
	fs.mkdirSync(path, { recursive: true });
}

// Read data file
const data = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'));
console.log(`Preparing ${Object.keys(data).length} locations`, Object.keys(data));

for (const [location_name, location_data] of Object.entries(data)) {
	// Pull locations from the files
	const { location, metadata } = location_data as { location: LocationData, metadata?: Record<string, string> };

	// Normalize the location
	const normalized = normalizeLocation(location);

	// Output the circuit input file
	fs.writeFileSync(`${OUTPUT_FOLDER}/${location_name}.json`, JSON.stringify({ ...normalized, nonce: 0}, null, 2));
	console.log(`Prepared ${location_name}`);

	// Write the metadata
	if (metadata !== undefined) {
		const locationHash = hashLocation(normalized);
		const locationHashInt = BigInt(locationHash);
		const meta = {
			name: metadata.name,
			description: `Proof I know where ${metadata.name} is.`,
			image: `https://where-in-the-world.standen.link/images/locations/${location_name}.jpg`,
			attributes: Object.entries(metadata as Record<string, string>).map(([k, v]) => ({ trait_type: k, value: v })),
		}
		fs.writeFileSync(`${METADATA_FOLDER}/${locationHashInt}.json`, JSON.stringify(meta, null, 2));
	} else {
		console.log(`No metadata for ${location_name}`);
	}
}
