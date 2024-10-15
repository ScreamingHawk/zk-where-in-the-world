// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

interface ILocationVerifierSignals {
    error InvalidProof();

    error InvalidLocation(uint256 locationHash);

    error AlreadyClaimed(uint256 nonceHash);
}

interface ILocationVerifier is ILocationVerifierSignals {
    /**
     * @notice Claim you know a location
     * @param pA The A component of the proof
     * @param pB The B component of the proof
     * @param pC The C component of the proof
     * @param pubSignals The public signals of the proof
     * @dev The first element of pubSignals is the location hash
     * @dev The second element of pubSignals is the nonce hash
     */
    function claim(
        uint256[2] calldata pA,
        uint256[2][2] calldata pB,
        uint256[2] calldata pC,
        uint256[2] calldata pubSignals
    ) external;
}
