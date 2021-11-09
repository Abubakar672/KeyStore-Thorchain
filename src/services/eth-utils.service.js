/** @format */

import { ethers } from "ethers";
import { TCAbi, TCRopstenAbi } from "../app/_abi/thorchain.abi";
import { ETH_DECIMAL } from "@xchainjs/xchain-ethereum/lib";
import { baseAmount } from "@xchainjs/xchain-util";

import { erc20ABI } from "../app/_abi/erc20.abi";
import { environment } from "../environments";
import { ethRUNERopsten } from "../app/_abi/erc20RUNE.abi";

// prettier-ignore
const testnetBasketABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"coin","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"addCoin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"coins","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"giveMeCoins","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isAdded","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}];

export class EthUtilsService {
  MAX_UINT256 = ethers.constants.MaxUint256;

  async getAssetDecimal(asset, client) {
    if (asset.chain === "ETH") {
      if (asset.symbol === "ETH") {
        return ETH_DECIMAL;
      } else {
        const wallet = client.getWallet();
        const assetAddress = asset.symbol.slice(asset.ticker.length + 1);
        const strip0x = assetAddress.substr(2);
        const checkSummedAddress = ethers.utils.getAddress(strip0x);
        const tokenContract = new ethers.Contract(
          checkSummedAddress,
          erc20ABI,
          wallet
        );
        const tokenDecimals = await tokenContract.decimals();
        return tokenDecimals;
      }
    } else {
      throw new Error("asset chain not ETH");
    }
  }

  async callDeposit({ inboundAddress, asset, memo, ethClient, amount }) {
    let hash;
    const abi = environment.network === "testnet" ? TCRopstenAbi : TCAbi;
    const ethAddress = await ethClient.getAddress();
    const gasPrice = baseAmount(
      ethers.utils.parseUnits(inboundAddress.gas_rate, "gwei").toString(),
      ETH_DECIMAL
    )
      .amount()
      .toFixed(0);

    if (asset.ticker === "ETH") {
      const contract = new ethers.Contract(inboundAddress.router, abi);
      const unsignedTx = await contract.populateTransaction.deposit(
        inboundAddress.address,
        "0x0000000000000000000000000000000000000000",
        amount.toFixed(),
        memo,
        { from: ethAddress, value: amount.toFixed(), gasPrice }
      );
      const resp = await ethClient.getWallet().sendTransaction(unsignedTx);

      // prettier-ignore
      hash = typeof(resp) === 'string' ? resp : resp?.hash || '';
    } else {
      const assetAddress = asset.symbol.slice(asset.ticker.length + 1);
      const strip0x = assetAddress.substr(2);
      const checkSummedAddress = ethers.utils.getAddress(strip0x);
      const params = [
        inboundAddress.address, // vault
        checkSummedAddress, // asset
        amount.toFixed(), // amount
        memo,
      ];
      const vaultContract = new ethers.Contract(inboundAddress.router, abi);
      const unsignedTx = await vaultContract.populateTransaction.deposit(
        ...params,
        { from: ethAddress, gasPrice }
      );
      const resp = await ethClient.getWallet().sendTransaction(unsignedTx);

      // prettier-ignore
      hash = typeof(resp) === 'string' ? resp : resp?.hash || '';
    }

    return hash;
  }

  async approveKeystore({
    contractAddress,
    provider,
    routerContractAddress,
    ethClient,
    ethInbound,
    userAddress,
  }) {
    const gasPrice = baseAmount(
      ethers.utils.parseUnits(ethInbound.gas_rate, "gwei").toString(),
      ETH_DECIMAL
    )
      .amount()
      .toFixed(0);

    const contract = new ethers.Contract(
      contractAddress,
      erc20ABI,
      provider
    ).connect(ethClient.getWallet());
    return await contract.approve(routerContractAddress, this.MAX_UINT256, {
      from: userAddress,
      gasPrice,
      gasLimit: "65000",
    });
  }

  async approveXDEFI({ ethClient, contractAddress, spenderAddress }) {
    return await ethClient.approve({
      contractAddress,
      amount: baseAmount(this.MAX_UINT256.toString()),
      spenderAddress,
    });
  }

  async approveMetaMask({ contractAddress, provider, routerContractAddress }) {
    const contract = new ethers.Contract(
      contractAddress,
      erc20ABI,
      provider.getSigner()
    );
    return await contract.approve(routerContractAddress, this.MAX_UINT256);
  }

  async isApproved(provider, contractAddress, routerContract, userAddress) {
    const contract = new ethers.Contract(contractAddress, erc20ABI, provider);
    const owner = userAddress;
    const spender = routerContract;
    const allowance = await contract.allowance(owner, spender);
    return allowance.gt(0);
  }

  async getTestnetRune(ethClient) {
    try {
      const wallet = await ethClient.getWallet();

      const basketERC20Contract = new ethers.Contract(
        "0xEF7a88873190098F0EA2CFB7C68AF9526AD79aad",
        testnetBasketABI,
        wallet
      );
      await basketERC20Contract.giveMeCoins();

      const testnetRuneContract = new ethers.Contract(
        "0xd601c6A3a36721320573885A8d8420746dA3d7A0",
        ethRUNERopsten,
        wallet
      );
      await testnetRuneContract.functions.giveMeRUNE();
    } catch (error) {
      console.log("error getting testnet RUNE");
      console.log(error);
    }
  }

  async estimateERC20Time(token, tokenAmount) {
    const tokenPool = await this.midgardService.getPool(token).toPromise();
    const ethPool = await this.midgardService.getPool("ETH.ETH").toPromise();
    // prettier-ignore
    const assetUnitsPerEth = (+tokenPool.assetPriceUSD) / (+ethPool.assetPriceUSD);
    const totalInEth = tokenAmount * assetUnitsPerEth;
    const chainBlockReward = 3;
    const chainBlockTime = 15; // seconds
    const estimatedMinutes =
      Math.ceil(totalInEth / chainBlockReward) * (chainBlockTime / 60);
    return estimatedMinutes < 1 ? 1 : estimatedMinutes;
  }

  getErc20ValueInEth(ethPool, tokenPool) {
    // prettier-ignore
    return (+tokenPool.assetPriceUSD) / (+ethPool.assetPriceUSD);
  }

  strip0x(hash) {
    return hash.toUpperCase().indexOf("0X") === 0 ? hash.substr(2) : hash;
  }
}
