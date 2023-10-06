# Building a Price Listing Dapp using the Flare FtsoRegistry contract

## Introduction
In this tutorial, we will create a Price Listing Dapp using the Flare FtsoRegistry contract. This Dapp will allow users to fetch the current prices of various assets.

Our goal is to empower users to access real-time price data for cryptocurrencies, tokens, and other assets without relying on centralized authorities. By building this Dapp, we aim to demonstrate the potential of blockchain technology in providing transparent and tamper-proof access to critical financial data.

Flare is the blockchain for data. It is a layer 1, EVM smart contract platform designed to expand the utility of blockchain.

If you prefer to div directly to the complete code. You can find it [here]([github](https://github.com/gconnect/FtsoRegistry-Dapp)).

## Prerequisite
To successfully follow along in this tutorial you need basic knowledge of:
- HTML, CSS, Next.js,
- Blockchain, solidity and hardhat

## Requirements
- [Vscode]() - But you can use any code editor of your choice
- [Hardhat](https://hardhat.org/) - used to deploy the smart contract
- [Node](https://nodejs.org/en/) - an open-source, cross-platform JavaScript runtime environment.
  
## Let's Get Started
The goal of this tutorial is to build a simple smart contract that leverages the FtsoRegistry contract and deploy to the Flare Blockchain. 

We will be interacting with the our smart contract using Next.js for the frontend to display the supported symbols and their current prices.

### Environment Setup
For this tutorial, we will be installing some dependencies but before that create a directory named `flare-dapp` for the project, and inside the project directory create two  directories named `blockchain` and `frontend` . Navigate to the `blockchain` directory, this will handle the blockchain aspect of the code.

You can achieve the above by running the below command from your terminal enter this command;
`mkdir -p flare-dapp/{blockchain,frontend} && cd flare-dapp/blockchain`

Inside the `blockchain` directory install the following depencies;  

```shell
npm init -y
npm i hardhat @flarenetwork/flare-periphery-contracts dotenv
```

Inside the frontend following dependencies;
```shell
   npx create-next-app@latest
   npm i ethers 

```

### Setup a Flare Wallet 
Before performing a transaction on the Flare Blockchain you will need to have an account setup.You can use the Coston2 testnet wallet for testing purposes. 

Visit the Flare Testnet [Faucet](https://coston2-faucet.towolabs.com/) to get testnet tokens.

And you can check the details of your transactions on the [explorer](https://coston2-explorer.flare.network/)

###  Create a Smart Contract
Inside the `blockchain` directory, navigate to the `contract` directory and create two files `IFtsoRegistry.sol` and `FtsoPriceFeed.sol` and paste the below codes into it.

**IFtsoRegistry.sol**

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
     * `_assetPriceUsdDecimals` An unsigned integer specifying the number of decimals to divide _price to get the actual USD value
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

**FtsoPriceFeed.sol**

The FtsoPriceFeed contract provides two external view functions:

**getSupportedSymbols():** Allows external parties to retrieve the supported symbols (e.g., asset tickers) from the FtsoRegistry.

**getPriceWithDecimals(string memory _symbol)**: Enables external parties to obtain price data for a specific asset symbol, returning a tuple with the price, timestamp, and decimals.

```solidity
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
```
### Compile and Deploy Contracts
Compile the contracts using Hardhat and deploy them to Flare coston2 testnet.

Navigate to `scripts/deploy.ts`. Copy and paste the below code

## scripts/deploy.ts
```ts
import { ethers } from "hardhat";

async function main() {
  const FLARE_CONTRACT_REGISTRY =
  "0x48Da21ce34966A64E267CeFb78012C0282D0Ac87";

  const ftsoPriceFeed = await ethers.deployContract("FtsoPriceFeed", [FLARE_CONTRACT_REGISTRY]);

  await ftsoPriceFeed.waitForDeployment();

  console.log(
    `FtsoPriceFeed  deployed to ${ftsoPriceFeed.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

```
Run this command to deploy the contract;
```shell
npx hardhat run scripts/deploy.ts --network coston2
```
## Optional
Inside the `script` directory create two files. `interact.ts` and `contract-interact.ts`.

Copy and paste the below code into  `interact.ts` file.

## interact.ts (Node  Interraction With FtsoRegistry )

This code interact directly with the Flare Contract using the frontend SDK to getSupported symbols and latest price.

```ts
const { nameToAbi } = require( "@flarenetwork/flare-periphery-contract-artifacts")
const { ethers,  JsonRpcProvider} = require("ethers") 
const FLARE_RPC = "https://coston2-api.flare.network/ext/C/rpc";
const provider = new JsonRpcProvider(FLARE_RPC);

// Retrieve the FTSO Registry    
const ftsoAddress = "0x48Da21ce34966A64E267CeFb78012C0282D0Ac87"
const flareAbi = nameToAbi("FtsoRegistry", "flare")

const ftsoRegistry = new ethers.Contract(
    ftsoAddress,
    flareAbi.data,
    provider);

const getSymbols = async () => {
    try{
        const symbols = await ftsoRegistry.getSupportedSymbols();
        console.log(symbols)
        return symbols
    }catch(error){
        console.error(error)
    }
}
 const getLatestPriceFromFTSO = async () => {
    try{
        // Get Latest Price
        const [_price, _timestamp, _decimals] =
            await ftsoRegistry["getCurrentPriceWithDecimals(string)"]("testUSDC");
            console.log(_price)
        const latestPrice = Number(_price) / Math.pow(10, Number(_decimals))
        console.log(`${Number(_price) / Math.pow(10, Number(_decimals))} USD`);
        console.log(`Calculated at ${new Date(Number(_timestamp) * 1000)}`);

        return latestPrice
    }catch(error){
        console.error(error)

    }
}

getSymbols()
getLatestPriceFromFTSO()

```
## scripts/contract-interact.ts
This code interacts with our deployed smart contract `FtsoRegistry.sol` that imports the Flare FtsoRegistry.

```ts
require('dotenv').config();
const { ethers,  JsonRpcProvider} = require("ethers") 
const priceFeedAbi = require("../artifacts/contracts/FtsoPriceFeed.sol/FtsoPriceFeed.json")
const contractAddress = "0xc87dc7bAE2A34D725Ed9E7fE138848E8fe438368"
const FLARE_RPC = "https://coston2-api.flare.network/ext/C/rpc";
const provider = new JsonRpcProvider(FLARE_RPC);

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const ftsoPriceFeedContract = new ethers.Contract(
    contractAddress,
    priceFeedAbi.abi,
    wallet);


const getSymbol = async () => {
    try{
        const symbol = await ftsoPriceFeedContract.getSupportedSymbols();
        console.log(symbol)
        return symbol
    }catch(error){
        console.error(error)
    }
}

const getPriceWithDecimals = async () => {
    try{
        const [_price, _timestamp, _decimals] = await ftsoPriceFeedContract.getPriceWithDecimals("testUSDC");
        const latestPrice = Number(_price) / Math.pow(10, Number(_decimals))
        const formattedDate = new Date(Number(_timestamp) * 1000)
        console.log(`${latestPrice} ${formattedDate}`)
        return {latestPrice, formattedDate}
    }catch(error){
        console.error(error)
    }
}

getSymbol()
getPriceWithDecimals()

```
To run the code simply open up your terminal. Ensure you are on this directory `blockcahain/scripts`

```shell
    node interact.ts
    node contract-interact.ts
```

### Create a Next.js Frontend
For this tutorial we will be using [Next.js](https://nextjs.org/docs/getting-started/installation). To keep things simple and short we will be building a simple UI. 

Navigate to the `frontend directory`
create a `utils` directory and an `interact.ts` file inside it.

The `interact.ts` file should look like this 

## utils/interact.ts - Frontend Smart Contract Interactions
This handles the interactions with the smart contract.

```ts

import { ethers,  JsonRpcProvider } from "ethers"
import priceFeedAbi from "../FtsoPriceFeed.json"
const contractAddress = "0xc87dc7bAE2A34D725Ed9E7fE138848E8fe438368"
const FLARE_RPC = "https://coston2-api.flare.network/ext/C/rpc";
const provider = new JsonRpcProvider(FLARE_RPC);

const ftsoPriceFeedContract = new ethers.Contract(
    contractAddress,
    priceFeedAbi.abi,
    provider);

export const getSupportedSymbols = async () => {
    try{
        const symbol = await ftsoPriceFeedContract.getSupportedSymbols();
        console.log(symbol)
        return symbol
    }catch(error){
        console.error(error)
    }
}

export const getPriceWithDecimals = async (_symbol: string) => {
    try{
        const [_price, _timestamp, _decimals] = await ftsoPriceFeedContract.getPriceWithDecimals(_symbol);
        const latestPrice = Number(_price) / Math.pow(10, Number(_decimals))
        const formattedDate = new Date(Number(_timestamp) * 1000)
        console.log(`${latestPrice} ${formattedDate}`)
        return {latestPrice, formattedDate}
    }catch(error){
        console.error(error)
    }
}
```

Replace the `page.tsx` file with this;

### page.tsx
This is a simple component that displays the symbols and their prices in a table.

```ts
"use client"; 
import { useEffect, useState } from "react"
import { getSupportedSymbols, getPriceWithDecimals } from "../utils/interact";

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [symbols, setSymbols] = useState([])
  const [pricelist, setPriceList] = useState<any[]>([])

  useEffect(() =>{
    const getLatestPrice = async (symbol: string) => {
      const {latestPrice, formattedDate} = await getPriceWithDecimals(symbol)
      return latestPrice
    }

    const getSymbols = async () => {
      let latestPriceList: any = []
      setLoading(true)
      const supportedSymbols = await getSupportedSymbols()
      setSymbols(supportedSymbols)
      setLoading(false)
      supportedSymbols.forEach((item: any) => {
      const price =  getLatestPrice(item)
      latestPriceList.push(price)
      setPriceList(latestPriceList)
      })
    }
    getSymbols()
  },[])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-4xl pb-4">Flare FTSO Registry Price Feeds</h1>
        <table className="border border-1 text-lg">
          <th className="border border-1 p-2">S/N</th>
          <th className="border border-1 p-2 ">Symbol</th>
          <th className="border border-1">Price</th>
          <tbody>
          { loading ?
           <div className="text-center text-lg">Fetching data...</div> 
            : !symbols ? 
            <div>Error Occurred!</div> 
            : symbols && symbols.map((item, index) =>
           <tr className="border border-1 p-2" key={index}>
            <td className="border border-1 p-2">{index + 1}</td>
            <td className="border border-1 p-2">{item}</td>
            <td className="border border-1 p-2">{pricelist[index]}</td>
         </tr>
          )}
          </tbody>                
        </table>
      </div>
    </main>
  )
}
```

Next.js has both app router and pages router option for this tutorial we will be using **app router**. Click [here](https://nextjs.org/docs/app/building-your-application/routing) to learn more about app router.

###  Run Your Next.js App
Start your Next.js app using `npm run dev` this should open up our dapp on this port `http://localhost:3000/`

## Conclusion
Congratulations 🎉 on finishing this tutorial! Thank you for taking the time to complete it. 

In this tutorial, you have learned 

- how to build a Price Listing Dapp using the Flare FtsoRegistry contract.

- This tutorial covered, interacting with the Flare FtsoRegistry Contract inside our own contract.
  
- How to deploy and interact with our contract using typescript both on node and on our nextjs frontend

To have access to the full codebase, here is the link to the project repo on [github](https://github.com/gconnect/FtsoRegistry-Dapp).


## References
- https://docs.flare.network/tech/flare/
- https://docs.flare.network/dev/tutorials/ftso/getting-data-feeds/

