# Where In The World

A ZK circuit that let's you prove you know where in the world a picture was taken.

## Installation

Install [node](https://nodejs.org/en/download) and [bun](https://bun.sh/docs/installation).

Install [circom](https://docs.circom.io/getting-started/installation/).

Install the dependencies:

```bash
bun install
```

> [!WARNING]
> This repository relies on [circomkit](https://github.com/erhant/circomkit).
> For some reason, `circomkit` commands may hang and fail to return. Once the process appears to hang, you can safely kill the process.

> [!TIP]
> Circomkit will download an appropriate Phase-1 PTAU file. This may take some time.
> Alternatively, you can provide a custom Phase-1 PTAU file by appending the file path to the `setup` command.

## Compile Circuit

Compile the circuit:

```bash
bun run compile
```

View information about the circuit:

```bash
bun run info
```

## Prepare Proving and Verification Keys

Prepare the proving and verification keys:

```bash
bun run setup
```

## Calculate the Witness

When calculating the witness, you will need to provide the latitude and longitude of the location where the picture was taken.
Because the circuit uses unsigned fixed point numbers, the latitude and longitude must be normalised as follows:

```js
latitude = (latitude + 90) * 10^4
longitude = (longitude + 180) * 10^4
```

As an example, the `images` folder contains a JSON file with the latitude and longitude of the Wanaka Tree. Extract the normalised values to an input JSON file:

```bash
mkdir -p inputs/location
cat images/wanaka_tree.json | jq -c .location | xargs -0 bun scripts/normalize_location.ts > inputs/location/wanaka_tree.json
```

Calculate the witness and proof:

```bash
bun run prove wanaka_tree
```

Validate the proof:

```bash
bun run verify wanaka_tree
```
