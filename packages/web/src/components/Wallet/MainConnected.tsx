import { Text } from "@0xsequence/design-system";
import { useAccount, useBytecode } from "wagmi";
import { VERIFIER_CONTRACT_ADDR } from "../../utils/constants";
import ChainInfo from "../ChainInfo";
import { Missing } from "../Missing";
import Disconnector from "./Disconnector";

const MainConnected = () => {
  const { address, chain, chainId } = useAccount();

  const bytecodeResult = useBytecode({
    address: VERIFIER_CONTRACT_ADDR,
  });

  if (!address) {
    return <Missing>an address</Missing>;
  }
  if (!chain) {
    return <Missing>a chain</Missing>;
  }
  if (!chainId) {
    return <Missing>a chainId</Missing>;
  }

  let message = "";
  let hasVerifier = false;

  if (!bytecodeResult.isLoading) {
    if (bytecodeResult.error) {
      message = "Error checking for Verifier contract";
    } else if ((bytecodeResult.data?.length || 0) <= 2) {
      message = "Verifier contract not found";
    } else {
      hasVerifier = true;
    }
  }

  return (
    <>
      <Text fontWeight="bold" color="text100">
        Connected with: {address}
      </Text>
      <Disconnector />
      {!hasVerifier && (
        <ChainInfo chain={chain} address={address} message={message} />
      )}
    </>
  );
};

export default MainConnected;
