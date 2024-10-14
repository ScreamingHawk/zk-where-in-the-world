// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {SingletonDeployer, console} from "erc2470-libs/script/SingletonDeployer.s.sol";
import {LocationVerifier} from "../src/LocationVerifier.sol";

contract Deploy is SingletonDeployer {
    function run() external {
        uint256 pk = vm.envUint("PRIVATE_KEY");

        bytes32 salt = bytes32(0);
        bytes memory initCode = type(LocationVerifier).creationCode;

        _deployIfNotAlready("LocationVerifier", initCode, salt, pk);
    }
}
