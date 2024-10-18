import { useAccount } from "wagmi";

import { Box, Button } from "@0xsequence/design-system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Location from "../components/Location";
import { LOCATION_HASHES, LOCATIONS } from "../utils/constants";
import "./Home.css";

const Play = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the Home if not connected
    if (!isConnected) {
      navigate("/");
    }
  }, [isConnected, navigate]);

  const [level, setLevel] = useState(0);

  const imageFilenames = LOCATIONS.map(
    (location) => `images/locations/${location}.jpg`
  );

  return (
    <div>
      <h1>Where in the world is this?</h1>
      <Location
        imageFilename={imageFilenames[level]}
        locationHash={LOCATION_HASHES[level]}
      />
      <Box
        display="flex"
        gap="4"
        justifyContent="center"
        alignItems="center"
        margin="4"
      >
        {level > 0 && (
          <Button
            onClick={() => setLevel(level - 1)}
            label="Previous"
            shape="square"
          />
        )}
        {level < LOCATIONS.length - 1 && (
          <Button
            onClick={() => setLevel(level + 1)}
            variant="primary"
            label="Next"
            shape="square"
          />
        )}
      </Box>
    </div>
  );
};

export default Play;
