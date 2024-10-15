// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import {ILocationVerifier} from "./ILocationVerifier.sol";
import {Groth16Verifier} from "circuits/location/groth16_verifier.sol";
import {ERC1155} from "solady/tokens/ERC1155.sol";

contract LocationVerifier is ILocationVerifier, Groth16Verifier, ERC1155 {
    mapping(uint256 => bool) public claimed;
    mapping(uint256 => bool) public locationHashes;

    string private _URI;

    constructor(string memory _uri, uint256[] memory _locationHashes) {
        _URI = _uri;
        for (uint256 i = 0; i < _locationHashes.length; i++) {
            locationHashes[_locationHashes[i]] = true;
        }
    }

    /// @inheritdoc ILocationVerifier
    function claim(
        uint256[2] calldata _pA,
        uint256[2][2] calldata _pB,
        uint256[2] calldata _pC,
        uint256[2] calldata _pubSignals
    ) public {
        uint256 locationHash = _pubSignals[0];
        uint256 nonceHash = _pubSignals[1];

        if (claimed[nonceHash]) {
            revert AlreadyClaimed(nonceHash);
        }
        if (!locationHashes[locationHash]) {
            revert InvalidLocation(locationHash);
        }

        bool valid = this.verifyProof(_pA, _pB, _pC, _pubSignals);
        if (!valid) {
            revert InvalidProof();
        }

        claimed[nonceHash] = true;

        _mint(msg.sender, locationHash, 1, "");
    }

    /// @inheritdoc ERC1155
    function uri(uint256) public view override returns (string memory) {
        return _URI;
    }
}
