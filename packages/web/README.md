# Where In The World Web

Website for the Where In The World project.

This package relies on [Sequence Embedded Wallet](https://docs.sequence.xyz/solutions/wallets/embedded-wallet/overview/) that uses [Sequence Kit](https://github.com/0xsequence/kit).

## Quickstart

Copy `.env.example` to `.env` and fill with your project information. To test things out, you can use the pre-provided keys in the `.env.example` file:

```
cp .env.example .env
```

Copy the images to the public folder:

```
mkdir -p public/images/locations
cp -r ../../images/*.jpg public/images/locations
```

Copy circuit files to the public folder:

```
mkdir -p public/circuits
cp ../circuits/build/location/groth16_pkey.zkey public/circuits
cp ../circuits/build/location/groth16_vkey.json public/circuits
cp ../circuits/build/location/location_js/location.wasm public/circuits
```

Then install and run:

```js
bun install && bun dev
```

The app will start on `localhost:4444`

## Configuration

Configuration can be updated in the `.env` file.

Obtain your own keys for wallet configuration from [Sequence Builder](https://sequence.build/).

The `LocationVerifier` contract address is required for the app to work.
This address can be obtained by deploying the contract as described in the [contracts package](../contracts/README.md).
Copy the address from the output of the deployment script and paste it in the `.env` file.

Location image filenames and their output hashes are set in `VITE_LOCATIONS` and `VITE_LOCATION_HASHES` respectively.
These are comma-separated lists of values.
