const { getNamedAccounts, ethers, network } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")
const AMOUNT = ethers.utils.parseEther("0.02")

async function getWeth() {
    const chainId = network.config.chainId
    const { deployer } = await getNamedAccounts()
    const iWeth = await ethers.getContractAt("IWeth", networkConfig[chainId].wethToken, deployer)
    const tx = await iWeth.deposit({ value: AMOUNT })
    await tx.wait(1)
    const wethBalance = await iWeth.balanceOf(deployer)
    console.log(`Weth balance: ${wethBalance.toString()}`)
}

module.exports = { getWeth, AMOUNT }
