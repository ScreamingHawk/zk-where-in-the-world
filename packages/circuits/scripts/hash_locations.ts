import fs from "fs";
import { poseidon2 } from "poseidon-lite";
import { normalizeLocation, type LocationData } from "./normalize_location";

const INPUT_FILE = "../../images/data.json";

export const hashLocation = (location: LocationData) => {
  const hash = poseidon2([location.latitude, location.longitude]);
  return `0x${hash.toString(16).padStart(64, "0")}`;
};

if (process.argv[1] === import.meta.filename) {
  // Read data file
  const data = JSON.parse(fs.readFileSync(INPUT_FILE, "utf8"));
  console.log(`Hashing ${Object.keys(data).length} locations`);
  console.log(Object.keys(data).join(","));

  const hashes = [];

  for (const [location_name, location_data] of Object.entries(data)) {
    const { location } = location_data as {
      location: LocationData;
      metadata?: Record<string, string>;
    };
    const normalized = normalizeLocation(location);
    const hashHex = hashLocation(normalized);
    hashes.push(hashHex);
    console.log(`${location_name}: ${hashHex}`);
  }

  console.log(hashes.join(","));
}
