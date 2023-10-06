// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./IFtsoRegistry.sol";
// import "@flarenetwork/flare-periphery-contracts/flare/ftso/userInterfaces/IFtsoRegistry.sol";

contract FtsoPriceFeed {
    IFtsoRegistry public registry;
  
    constructor(address _registryAddress) {
        registry = IFtsoRegistry(_registryAddress);
    }


    function getSupportedSymbols() external view returns (string[] memory) {
        return registry.getSupportedSymbols();
    }

    function getPriceWithDecimals(string memory _symbol) external view returns (uint256, uint256, uint256) {
        return registry.getCurrentPriceWithDecimals(_symbol);
    }

}
