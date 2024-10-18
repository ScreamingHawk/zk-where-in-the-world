import { Box, Image, Text } from "@0xsequence/design-system";
import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { zeroAddress } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { ProofData, signalToHex } from "../../utils/circuit";
import MarkerOnClick from "./MarkerOnClick";
import SubmitProof from "./SubmitProof";
import { LocationVerifierABI } from "../../utils/abis/LocationVerifier";
import { VERIFIER_CONTRACT_ADDR } from "../../utils/constants";

type LocationProps = {
  imageFilename: string;
  locationHash: `0x${string}`;
};

const Location: React.FC<LocationProps> = (props) => {
  const [proofData, setProofData] = useState<ProofData>();
  const { address } = useAccount();

  const { data: balanceData, queryKey: balanceQueryKey } = useReadContract({
    abi: LocationVerifierABI,
    address: VERIFIER_CONTRACT_ADDR,
    functionName: "balanceOf",
    args: [address || zeroAddress, BigInt(props.locationHash)],
  });

  const hasBalance = balanceData !== undefined && balanceData > 0;

  return (
    <Box display="flex" flexDirection="column" gap="4">
      <Image
        src={props.imageFilename}
        style={{ maxHeight: "50vh", objectFit: "contain" }}
      />
      <div style={{ height: "50vh", width: "100%" }}>
        <MapContainer
          center={[0, 0]}
          zoom={1}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerOnClick setProofData={setProofData} />
        </MapContainer>
      </div>
      {proofData &&
        signalToHex(proofData.publicSignals[0]) == props.locationHash && (
          <Box display="flex" flexDirection="column" gap="4">
            <Text>That's correct!</Text>
            <SubmitProof found={hasBalance} balanceQueryKey={balanceQueryKey} {...proofData} />
          </Box>
        )}
        {hasBalance && (
          <Box display="flex" justifyContent="center">
            <Text>Found and claimed!</Text>
          </Box>
        )}
    </Box>
  );
};

export default Location;
