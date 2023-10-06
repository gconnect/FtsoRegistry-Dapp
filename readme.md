# Simple FtsoRegistry Dapp
This a simple dApp illustrating how to interact with Flare FtsoRegistry Contract.

# IFtsoRegistry.sol
More detailed documentation has been added to the `IFtsoRegistry.sol` and it can be found in [IFtsoRegistry.sol](https://github.com/gconnect/FtsoRegistry-Dapp/blob/master/blockchain/contracts/IFtsoRegistry.sol)

# Frontend Javascript Interraction

## Node Interaction
The JavaScript interactions were done in two ways. The FtsoRegisry was implemented on the `FtsoPriceFeeds.sol` contract. The code that handles interactions can be found in the [contract-interact.ts](https://github.com/gconnect/FtsoRegistry-Dapp/blob/master/blockchain/scripts/contract-interact.ts) and [interact.ts](https://github.com/gconnect/FtsoRegistry-Dapp/blob/master/blockchain/scripts/interact.ts) file.

## Next.js Interaction
The Next.js frontend interaction can be found in [utils/interact.ts](https://github.com/gconnect/FtsoRegistry-Dapp/blob/master/frontend/utils/interact.ts)

# Tutorial
For a more detailed guide on implementing the FtsoRegsitry and building this dApp check out the [tutorial.md](https://github.com/gconnect/FtsoRegistry-Dapp/blob/master/tutorial.md)

# Live Demo
Click [here](https://ftsoregistry.vercel.app/) to view the live version of the dApp. 

# Setup Instruction
- Fork/ clone the repository
- Navigate to the frontend directory and run `npm i` this will install all required dependencies
- To start the local server, run `npm run dev`. This will start the local server at `http://localhost:3000/`

# Disclaimer
This contract is unaudited. Use with discrection!

# License
This repository is licensed to be used freely.
