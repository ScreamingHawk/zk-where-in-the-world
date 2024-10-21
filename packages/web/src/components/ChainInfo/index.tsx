import { Box, Text } from "@0xsequence/design-system";
import { Address, Chain } from "viem";
import ActiveChain from "./ActiveChain";
import ChainSwitcher from "./ChainSwitcher";

type ChainInfoProps = {
  chain: Chain;
  address: Address;
  message?: string;
};

const ChainInfo: React.FC<ChainInfoProps> = (props) => {
  const { chain, message } = props;

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
      {message && message !== "" && (
        <Box display="flex">
          <Text variant="large" fontWeight="bold" color="text100">
            {message}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default ChainInfo;
