import { Chain, anvil, arbitrum, arbitrumSepolia } from "wagmi/chains";

export const CHAINS = [anvil, arbitrumSepolia, arbitrum] as [Chain, ...Chain[]];
export const DEFAULT_CHAIN = arbitrumSepolia;

export const VERIFIER_CONTRACT_ADDR = import.meta.env
  .VITE_VERIFIER_CONTRACT_ADDR;

const arrayify = (str: string) => {
  return str
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
};

export const LOCATIONS = arrayify(import.meta.env.VITE_LOCATIONS);
export const LOCATION_HASHES = arrayify(
  import.meta.env.VITE_LOCATION_HASHES,
) as `0x${string}`[];

export const ETHERSCAN_BASE_URL = DEFAULT_CHAIN.id === (arbitrum as Chain).id ? "https://arbiscan.io" : "https://sepolia.arbiscan.io";
