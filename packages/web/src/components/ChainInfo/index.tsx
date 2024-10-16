import { Box } from "@0xsequence/design-system";
import { Address, Chain } from "viem";
import ActiveChain from "./ActiveChain";
import ChainSwitcher from "./ChainSwitcher";
import VerifierStatus from "./VerifierStatus";

const ChainInfo = (props: { chain: Chain; address: Address }) => {
  const { chain } = props;

  return (
    <Box marginBottom="8">
      <Box
        display="flex"
        gap="4"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <ActiveChain chain={chain} />
        <ChainSwitcher chain={chain} />
      </Box>
      <VerifierStatus />
    </Box>
  );
};

export default ChainInfo;
