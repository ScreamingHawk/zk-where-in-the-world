import { Text } from "@0xsequence/design-system";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useWriteContract } from "wagmi";
import { LocationVerifierABI } from "../../utils/abis/LocationVerifier";
import { proofCalldata, ProofData } from "../../utils/circuit";
import { VERIFIER_CONTRACT_ADDR } from "../../utils/constants";
import CardButton from "../CardButton";

type SubmitProofProps = ProofData & {
  found: boolean;
  balanceQueryKey: QueryKey;
};

function bigIntReplacer(_: string, value: unknown): unknown {
  if (typeof value === "bigint") {
    return value.toString() + "n";
  }
  return value;
}

const SubmitProof: React.FC<SubmitProofProps> = (props) => {
  const { data: txHash, isPending, error, writeContract } = useWriteContract();
  const queryClient = useQueryClient();

  const runSendTransaction = async () => {
    const args = await proofCalldata(props);
    await writeContract({
      address: VERIFIER_CONTRACT_ADDR,
      abi: LocationVerifierABI,
      functionName: "claim",
      args,
    });
    await queryClient.invalidateQueries({ queryKey: props.balanceQueryKey });
  };

  return (
    <>
      {!props.found && !txHash && (
        <CardButton
          title="Submit Proof"
          description="Send a transaction with your wallet"
          isPending={isPending}
          onClick={runSendTransaction}
        />
      )}
      {error && <Text>Error: {JSON.stringify(error, bigIntReplacer, 2)}</Text>}
      {txHash && <Text>Transaction hash: {txHash}</Text>}
    </>
  );
};

export default SubmitProof;
