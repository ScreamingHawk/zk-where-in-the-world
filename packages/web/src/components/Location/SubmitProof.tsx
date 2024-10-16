import React from "react";
import { proofCalldata, ProofData } from "../../utils/circuit";
import CardButton from "../CardButton";
import { useWriteContract } from "wagmi";
import { VERIFIER_CONTRACT_ADDR } from "../../utils/constants";
import { LocationVerifierABI } from "../../utils/abis/LocationVerifier";
import { Text } from "@0xsequence/design-system";

function bigIntReplacer(_: string, value: unknown): unknown {
  if (typeof value === "bigint") {
    return value.toString() + "n";
  }
  return value;
}

const SubmitProof: React.FC<ProofData> = (props) => {
  const { data: txHash, isPending, error, writeContract } = useWriteContract();

  const runSendTransaction = async () => {
    const args = await proofCalldata(props);
    writeContract({
      address: VERIFIER_CONTRACT_ADDR,
      abi: LocationVerifierABI,
      functionName: "claim",
      args,
    });
  };

  return (
    <>
      <CardButton
        title="Submit Proof"
        description="Send a transaction with your wallet"
        isPending={isPending}
        onClick={runSendTransaction}
      />
      {error && <Text>Error: {JSON.stringify(error, bigIntReplacer, 2)}</Text>}
      {txHash && <Text>Transaction hash: {txHash}</Text>}
    </>
  );
};

export default SubmitProof;
