import { Box, Image, Text, TextInput } from "@0xsequence/design-system";
import { ChangeEvent, useEffect, useState } from "react";
import {
  generateProof,
  LocationData,
  ProofData,
  signalToHex,
} from "../../utils/circuit";
import SubmitProof from "./SubmitProof";

type LocationProps = {
  imageFilename: string;
  locationHash: `0x${string}`;
};

const Location: React.FC<LocationProps> = (props) => {
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();

  const [proofData, setProofData] = useState<ProofData>();

  const proveLocation = async (location: LocationData) => {
    const result = await generateProof(location);
    setProofData(result);
  };

  useEffect(() => {
    if (latitude === undefined || longitude === undefined) {
      return;
    }
    proveLocation({ latitude, longitude });
  }, [latitude, longitude]);

  return (
    <Box display="flex" flexDirection="column" gap="4">
      <Image src={props.imageFilename} />
      <TextInput
        name="Latitude"
        controls="Latitude"
        numeric={true}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setLatitude(Number.parseFloat(e.target.value));
        }}
      />
      <TextInput
        name="Longitude"
        controls="Longitude"
        numeric={true}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setLongitude(Number.parseFloat(e.target.value))
        }
      />
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
