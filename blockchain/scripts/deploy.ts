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
