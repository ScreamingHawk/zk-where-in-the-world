#!/bin/bash

# Navigate to the circuits directory
cd ../circuits

# Generate calldata, format it for ABI encoding, and pass it to cast abi-encode
calldata=$(bun circomkit calldata location wanaka_tree | \
  # Replace line breaks with commas, dedup commas, remove leading/trailing commas and remove non-hex characters
  sed ':a;N;$!ba;s/\n/,/g;s/,,*/,/g;s/^,\|,$//g;s/[^xa-f0-9,]//g')

# Use the formatted calldata for ABI encoding
cast abi-encode "x(uint256[9])" "[$calldata]"
