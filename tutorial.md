Tutorial Outline

# Building your First Dapp on the Flare Blockchain

## Introduction
This tutorial will take you through a step-by-step guide on how to interact with the IFtsoRegistry, how to create a smart contract, deploy it to the Flare Blockchain and interact with it on the frontend on a nextjs app.

Flare is the blockchain for data. It is a layer 1, EVM smart contract platform designed to expand the utility of blockchain

## Prerequisite
To successfully follow along in this tutorial you need basic knowledge of:
- HTML, CSS, Next.js,
- Blockchain, solidity and hardhat

## Requirements
- [Vscode]() - But you can use any code editor of your choice
- [Hardhat](https://hardhat.org/) - used to deploy the smart contract
- [Node](https://nodejs.org/en/) - an open-source, cross-platform JavaScript runtime environment.
  
## Let's Get Started
The goal of this tutorial is to build the build a simple smart contract and deploy to the Flare Blockchain. 

### Environment Setup

### Setup a Flare Wallet 
Before performing a transaction on the Flare Blockchain you will need to have an account setup.

###  Create a Smart Contract

**IFtoRegistry.sol**

```solidity
interface IFtsoRegistry { 

    // Returns the list of supported symbols like BTC, ETH, FLR... 
    /**
     * @dev Returns `_supportedSymbols`, An array of strings representing the supported symbols.
     */
    function getSupportedSymbols() 
        external 
        view 
        returns( 
            string[] memory _supportedSymbols
        ); 

    // Returns USD price of the requested symbol, which must be divided by
    // the returned number of decimals, e.g., if decimals is 5, a price of 
    // 1234 actually means 0.01234

    /**
     * @dev Sets `_symbol` A string representing the symbol for which the price is requested (e.g., "BTC" for Bitcoin).
     * Returns `_price` An unsigned integer representing the current price of the symbol, 
     * `_timestamp` An unsigned integer representing the timestamp of the price data and
     *  `_assetPriceUsdDecimals` An unsigned integer specifying the number of decimals to divide _price to get the actual USD value
     */
    function getCurrentPriceWithDecimals(string memory _symbol) 
        external view 
        returns( 
            uint256 _price, 
            uint256 _timestamp, 
            uint256 _assetPriceUsdDecimals
        ); 
} 

```

**PriceFeed.sol**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Iregistry.sol";

contract PriceFeed {
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

```
### Compile and Deploy Contracts
Compile the contracts using Hardhat and deploy them to a local Hardhat network or a testnet.

### Set Up Hardhat Project
Set up a new Hardhat project with the necessary configuration.

### Create a Next.js Frontend
For this tutorial we will be using [Next.js](https://nextjs.org/docs/getting-started/installation). To keep things simple and short we will be building a simple UI. 

To setup our frontend run the below command

```shell
npx create-next-app@latest
```


Next.js has both app router and pages router option for this tutorial we will be using **app router**. Click [here](https://nextjs.org/docs/app/building-your-application/routing) to learn more about app router.



###  Run Your Next.js App
Start your Next.js app using `npm run dev` and access it through a web browser to interact with the contract and fetch data from the IFtsoRegistry interface.

## Conclusion
Congratulations 🎉 on finishing this tutorial! Thank you for taking the time to complete it. In this tutorial, you have learned how to build your first dApp on the Flare Blockchain.

To have access to the full codebase, here is the link to the project repo on [github]().


## References
- https://docs.flare.network/tech/flare/
- https://docs.flare.network/dev/tutorials/ftso/getting-data-feeds/
- https://coston2-explorer.flare.network/
- https://coston2-faucet.towolabs.com/
