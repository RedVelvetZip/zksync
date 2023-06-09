import fs from "fs"
import { utils, Wallet } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

const PRIV_KEY = fs.readFileSync(".secret").toString()

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the NFT contract`);

  // Initialize the wallet.
  const wallet = new Wallet(PRIV_KEY);

  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("Red_ERC721");

  // Deposit some funds to L2 in order to be able to perform L2 transactions.
//   const depositAmount = ethers.utils.parseEther("0.001");
//   const depositHandle = await deployer.zkWallet.deposit({
//     to: deployer.zkWallet.address,
//     token: utils.ETH_ADDRESS,
//     amount: depositAmount,
//   });
//   // Wait until the deposit is processed on zkSync
//   await depositHandle.wait();

  // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
  const nftContract = await deployer.deploy(artifact, []);

  // Show the contract info.
  const contractAddress = nftContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);

  // // Call the deployed contract.
  // const greetingFromContract = await nftContract.greet();
  // if (greetingFromContract == greeting) {
  //   console.log(`Contract greets us with ${greeting}!`);
  // } else {
  //   console.error(`Contract said something unexpected: ${greetingFromContract}`);
  // }

  // // Edit the greeting of the contract
  // const newGreeting = "Hey guys";
  // const setNewGreetingHandle = await nftContract.setGreeting(newGreeting);
  // await setNewGreetingHandle.wait();

  // const newGreetingFromContract = await nftContract.greet();
  // if (newGreetingFromContract == newGreeting) {
  //   console.log(`Contract greets us with ${newGreeting}!`);
  // } else {
  //   console.error(`Contract said something unexpected: ${newGreetingFromContract}`);
  // }
}
