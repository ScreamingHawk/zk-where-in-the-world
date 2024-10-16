import { Box, Button, Text } from "@0xsequence/design-system";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import ChainInfo from "../ChainInfo";
import { Missing } from "../Missing";
import Disconnector from "./Disconnector";

const MainConnected = () => {
  const { address, chain, chainId } = useAccount();
  const navigate = useNavigate();
  if (!address) {
    return <Missing>an address</Missing>;
  }
  if (!chain) {
    return <Missing>a chain</Missing>;
  }
  if (!chainId) {
    return <Missing>a chainId</Missing>;
  }
  return (
    <>
      <Text fontWeight="bold" color="text100">
        Connected with address: {address}
      </Text>
      <Disconnector />
      <ChainInfo chain={chain} address={address} />
      <Box display="flex" flexDirection="column" gap="4" alignItems="center">
        <Button
          variant="feature"
          onClick={() => navigate("/play")}
          shape="square"
          label={
            <Text variant="xlarge" fontWeight="bold">
              Play
            </Text>
          }
        />
      </Box>
    </>
  );
};

export default MainConnected;
