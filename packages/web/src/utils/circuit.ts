import { randomBytes } from "crypto";
import { groth16, PublicSignals, type Groth16Proof } from "snarkjs";
import { LocationData, normalizeLocation } from "./location";

const generateNonce = (): string =>
  BigInt(Number.parseInt(randomBytes(2).toString("hex"), 16)).toString();

export type ProofData = {
  proof: Groth16Proof;
  publicSignals: PublicSignals;
};

export const generateProof = async (
  location: LocationData,
  nonce?: string,
): Promise<ProofData> => {
  if (!nonce) {
    nonce = generateNonce();
  }

  const normalizedLocation = normalizeLocation(location);

  const { proof, publicSignals } = await groth16.fullProve(
    { ...normalizedLocation, nonce },
    "circuits/location.wasm",
    "circuits/groth16_pkey.zkey",
  );

  // const vkey = await fetch("circuits/groth16_vkey.json").then( function(res) {
  //   return res.json();
  // });
  // const res = await groth16.verify(vkey, publicSignals, proof);

  return { proof, publicSignals };
};

export const proofCalldata = async (
  proofData: ProofData,
): Promise<
  readonly [
    readonly [bigint, bigint],
    readonly [readonly [bigint, bigint], readonly [bigint, bigint]],
    readonly [bigint, bigint],
    readonly [bigint, bigint],
  ]
> => {
  const calldataJ = await groth16.exportSolidityCallData(
    proofData.proof,
    proofData.publicSignals,
  );
  const calldata = JSON.parse(`[${calldataJ}]`);
  const [pi_a, pi_b, pi_c, publicSignals] = calldata;

  return [
    [BigInt(pi_a[0]), BigInt(pi_a[1])],
    [
      [BigInt(pi_b[0][0]), BigInt(pi_b[0][1])],
      [BigInt(pi_b[1][0]), BigInt(pi_b[1][1])],
    ],
    [BigInt(pi_c[0]), BigInt(pi_c[1])],
    [BigInt(publicSignals[0]), BigInt(publicSignals[1])],
  ];
};

export const signalToHex = (signal: string): string => {
  const output = BigInt(signal);
  const hashHex = output.toString(16);
  return `0x${hashHex.padStart(64, "0")}`;
};
