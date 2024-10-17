# Where In The World Contracts

Solidity contracts for the Where In The World project.

## Installation

Install [foundry](https://book.getfoundry.sh/getting-started/installation).

> [!IMPORTANT]
> Before following the steps in this package, ensure you have completed the steps in the [circuits](../circuits/README.md) package.

## Generate the Verifier Contract

Generate the verifier contract for the circuit:

```bash
cd ../circuits && bun run solidity
```

Compile and test the contract:

```bash
forge build
forge test
forge snapshot
```

## Deployment

Copy `.env.example` to `.env` and fill with your information:

```
cp .env.example .env
```

Note that `LOCATION_HASHES` is a comma-separated list of the output hashes of valid locations.
You can get the output hashes by running:

```bash
cd ../circuits && bun run scripts/hash_locations.ts
```

Deploy the contract:

```bash
forge script script/Deploy.s.sol:Deploy --rpc-url <rpc_url> --broadcast
```
