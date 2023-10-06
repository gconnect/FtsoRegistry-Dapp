import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('FtsoPriceFeed', function () {
  let ftsoPriceFeed: any;
  const ftsoRegistryAddress =
  "0x48Da21ce34966A64E267CeFb78012C0282D0Ac87";

  beforeEach(async function () {

    // Deploy FtsoPriceFeed and link it to the FtsoRegistry instance
     ftsoPriceFeed = await ethers.deployContract("FtsoPriceFeed", [ftsoRegistryAddress]);
    await ftsoPriceFeed.waitForDeployment();
    console.log(
        `FtsoPriceFeed  deployed to ${ftsoPriceFeed.target}`
      );
  });

  it('should return supported symbols', async function () {
    const supportedSymbols: string[] = await ftsoPriceFeed.getSupportedSymbols();
    console.log(supportedSymbols)
    // Perform assertions
    // expect(supportedSymbols).to.be.an('array');
    // expect(supportedSymbols).to.deep.equal(['C2FLR', 'testLTC', 'testDOGE']); // Check the contents of the array

    // Add more assertions as needed
  });

  it('should return price with decimals', async function () {
    const symbol = 'testUSDC';
    const [price, decimals, timestamp]: [number, number, number] = await ftsoPriceFeed.getPriceWithDecimals(symbol);
    console.log(price)
    // // Perform assertions
    // expect(price).to.be.a('number');
    // expect(decimals).to.be.a('number');
    // expect(timestamp).to.be.a('number');
    // Add more assertions as needed
  });
});