import { LatLng } from "leaflet";
import { useEffect, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { generateProof, ProofData } from "../../utils/circuit";
import { roundLocation } from "../../utils/location";

type MarkerOnClickProps = {
  setProofData: React.Dispatch<React.SetStateAction<ProofData | undefined>>;
};

const MarkerOnClick: React.FC<MarkerOnClickProps> = ({ setProofData }) => {
  const [marker, setMarkers] = useState<LatLng>();

  useMapEvents({
    click(e) {
      const marker = e.latlng;
      setMarkers(marker);
    },
  });

  useEffect(() => {
    if (marker === undefined) {
      return;
    }
    const { latitude, longitude } = roundLocation({
      latitude: marker.lat,
      longitude: marker.lng,
    });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    generateProof({ latitude, longitude }).then((result) => {
      console.log("Generated proof");
      setProofData(result);
    });
  }, [marker, setProofData]);

  if (!marker) {
    return null;
  }

  const { latitude, longitude } = roundLocation({
    latitude: marker.lat,
    longitude: marker.lng,
  });

  return (
    <Marker position={marker}>
      <Popup>
        {latitude}, {longitude}
      </Popup>
    </Marker>
  );
};

export default MarkerOnClick;
