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

## Calculate and Validate the Witness

When calculating the witness, you will need to provide the latitude and longitude of the location where the picture was taken.
Because the circuit uses unsigned fixed point numbers, the latitude and longitude must be normalised as follows:

```js
latitude = (latitude + 90) * 10**3
longitude = (longitude + 180) * 10**3
```

As an example, the `images` folder at the root contains a JSON file with the latitude and longitude of [That Wanaka Tree](https://en.wikipedia.org/wiki/That_W%C4%81naka_Tree). Include your own locations here for bulk processing.

Prepare the input JSON file:

```bash
bun scripts/prepare_locations.ts
```

Obtain the output hashes of the locations:

```bash
bun scripts/hash_location.ts
```

Calculate the witness and proof:

```bash
bun run prove wanaka_tree
```

Change the `wanaka_tree` argument to the name of the location you want to prove.

Validate the proof:

```bash
bun run verify wanaka_tree
```
