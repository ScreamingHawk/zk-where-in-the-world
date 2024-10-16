import { Box, Text } from "@0xsequence/design-system";
import { VERIFIER_CONTRACT_ADDR } from "../../utils/constants";
import { useBytecode } from "wagmi";

const VerifierStatus = () => {
  const bytecodeResult = useBytecode({
    address: VERIFIER_CONTRACT_ADDR,
  });

  let message = "Checking for Verifier contract...";

  if (bytecodeResult.error) {
    message = "Error checking for Verifier contract";
  } else if ((bytecodeResult.data?.length || 0) <= 2) {
    message = "Verifier contract not found";
  } else {
    message = "Verifier contract found";
  }

  return (
    <Box display="flex">
      <Text variant="large" fontWeight="bold" color="text100">
        {message}
      </Text>
    </Box>
  );
};

export default VerifierStatus;
