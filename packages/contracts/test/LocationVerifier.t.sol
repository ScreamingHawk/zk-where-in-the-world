// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Test, console} from "forge-std/Test.sol";
import {ILocationVerifierSignals} from "../src/ILocationVerifier.sol";
import {LocationVerifier} from "../src/LocationVerifier.sol";

contract LocationVerifierTest is Test, ILocationVerifierSignals {
    LocationVerifier public verifier;

    uint256[] public validLocations = [0x097139efc944743a09aeac7e3fe407ec01b1fe2edb4dfa5a8bf0b2cd852086a8];

    address public receiver = makeAddr("receiver");

    function setUp() public {
        verifier = new LocationVerifier("uri", validLocations);
    }

    function _getValidCalldata()
        private
        returns (uint256[2] memory pA, uint256[2][2] memory pB, uint256[2] memory pC, uint256[2] memory pubSignals)
    {
        // Use ffi to get the valid calldata
        string[] memory inputs = new string[](1);
        inputs[0] = "./get_valid_calldata.sh";
        bytes memory res = vm.ffi(inputs);
        uint256[10] memory output = abi.decode(res, (uint256[10]));

        pA = [output[0], output[1]];
        pB = [[output[2], output[3]], [output[4], output[5]]];
        pC = [output[6], output[7]];
        pubSignals = [output[8], output[9]];

        // Check that the location is valid
        assertEq(pubSignals[0], validLocations[0]);
    }

    function test_ValidProof() public {
        (uint256[2] memory pA, uint256[2][2] memory pB, uint256[2] memory pC, uint256[2] memory pubSignals) =
            _getValidCalldata();

        bool valid = verifier.verifyProof(pA, pB, pC, pubSignals);
        assertTrue(valid);
    }

    function test_InvalidProof(
        uint256[2] memory pA,
        uint256[2][2] memory pB,
        uint256[2] memory pC,
        uint256[2] memory pubSignals
    ) public {
        bool valid = verifier.verifyProof(pA, pB, pC, pubSignals);
        assertFalse(valid);

        pubSignals[0] = validLocations[0]; // Pretend it's a valid location
        vm.expectRevert(InvalidProof.selector);
        verifier.claim(pA, pB, pC, pubSignals);
    }

    function test_Claim() public {
        (uint256[2] memory pA, uint256[2][2] memory pB, uint256[2] memory pC, uint256[2] memory pubSignals) =
            _getValidCalldata();

        vm.prank(receiver);
        verifier.claim(pA, pB, pC, pubSignals);

        assertEq(verifier.balanceOf(receiver, pubSignals[0]), 1);

        vm.expectRevert(abi.encodeWithSelector(AlreadyClaimed.selector, pubSignals[1]));
        verifier.claim(pA, pB, pC, pubSignals);
    }

    function test_ClaimInvalidLocation() public {
        (uint256[2] memory pA, uint256[2][2] memory pB, uint256[2] memory pC, uint256[2] memory pubSignals) =
            _getValidCalldata();

        uint256[] memory locations = new uint256[](0);

        verifier = new LocationVerifier("uri", locations);

        vm.expectRevert(abi.encodeWithSelector(InvalidLocation.selector, pubSignals[0]));
        verifier.claim(pA, pB, pC, pubSignals);
    }
}
