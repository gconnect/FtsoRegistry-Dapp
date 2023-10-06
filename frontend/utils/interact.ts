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