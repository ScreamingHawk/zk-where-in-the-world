import { Box, Image, Text } from "@0xsequence/design-system";
import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { ProofData, signalToHex } from "../../utils/circuit";
import MarkerOnClick from "./MarkerOnClick";
import SubmitProof from "./SubmitProof";

type LocationProps = {
  imageFilename: string;
  locationHash: `0x${string}`;
};

const Location: React.FC<LocationProps> = (props) => {
  const [proofData, setProofData] = useState<ProofData>();

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
            <SubmitProof {...proofData} />
          </Box>
        )}
    </Box>
  );
};

export default Location;
