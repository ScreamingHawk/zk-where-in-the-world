// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Test, console} from "forge-std/Test.sol";
import {LocationVerifier} from "src/LocationVerifier.sol";

contract LocationVerifierTest is Test {
    LocationVerifier public verifier;

    function setUp() public {
        verifier = new LocationVerifier();
    }

    function test_ValidProof() public {
        // Use ffi to get the valid calldata
        string[] memory inputs = new string[](1);
        inputs[0] = "./get_valid_calldata.sh";
        bytes memory res = vm.ffi(inputs);
        uint256[9] memory output = abi.decode(res, (uint256[9]));

        uint256[2] memory pA = [output[0], output[1]];
        uint256[2][2] memory pB = [[output[2], output[3]], [output[4], output[5]]];
        uint256[2] memory pC = [output[6], output[7]];
        uint256[1] memory pubSignals = [output[8]];

        // Wanaka tree expected public signal
        assertEq(pubSignals[0], 0x097139efc944743a09aeac7e3fe407ec01b1fe2edb4dfa5a8bf0b2cd852086a8);

        bool valid = verifier.verifyProof(pA, pB, pC, pubSignals);
        assertTrue(valid);
    }

    function test_InvalidProof(
        uint256[2] memory pA,
        uint256[2][2] memory pB,
        uint256[2] memory pC,
        uint256[1] memory pubSignals
    ) public view {
        bool valid = verifier.verifyProof(pA, pB, pC, pubSignals);
        assertFalse(valid);
    }
}
