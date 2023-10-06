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
    const symbol = await ftsoPriceFeedContract.getSupportedSymbols();
    console.log(symbol)
    return symbol
}

const getPriceWithDecimals = async () => {
    const [_price, _timestamp, _decimals] = await ftsoPriceFeedContract.getPriceWithDecimals("testUSDC");
    const latestPrice = Number(_price) / Math.pow(10, Number(_decimals))
    const formattedDate = new Date(Number(_timestamp) * 1000)
    console.log(`${latestPrice} ${formattedDate}`)
    return {latestPrice, formattedDate}
}

getSymbol()
getPriceWithDecimals()
