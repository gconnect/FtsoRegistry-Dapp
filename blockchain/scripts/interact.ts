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