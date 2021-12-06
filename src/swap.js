/** @format */

import { MidgardService } from "./services/midgard.service";
import { EthUtilsService } from "./services/eth-utils.service";
import { TransactionUtilsService } from "./services/transaction-utils.service";
import { ethers } from "ethers";
import { environment } from "./environments";
import { TCAbi, TCRopstenAbi } from "./app/_abi/thorchain.abi";
import React, { useState, useEffect } from "react";
import * as all from "@thorchain/asgardex-util";
import {
  getDoubleSwapOutput,
  getSwapSlip,
  getDoubleSwapSlip,
  PoolData,
  getValueOfAssetInRune,
  getValueOfRuneInAsset,
  getSwapOutput,
} from "@thorchain/asgardex-util";
const thorchainClient = require("@xchainjs/xchain-thorchain");
const binanceClient = require("@xchainjs/xchain-binance");
const bitcoinClient = require("@xchainjs/xchain-bitcoin");
const ethereumClient = require("@xchainjs/xchain-ethereum/lib");
const litecoinClient = require("@xchainjs/xchain-litecoin");
const bitcoinCashClient = require("@xchainjs/xchain-bitcoincash");
const polkadotClient = require("@xchainjs/xchain-polkadot");
// import { polkadotClient } from "@xchainjs/xchain-polkadot";
const cosmosXchainClient = require("@xchainjs/xchain-cosmos");

console.log("alllllll<><><><><><><><><><><><<><><><>", all);
const {
  AssetRuneNative,
  AssetBNB,
  baseAmount,
  AssetETH,
  assetToBase,
  assetAmount,
  assetFromString,
  baseToAsset,
  formatAssetAmount,
  assetToString,
} = require("@xchainjs/xchain-util");

// const blockchainClient = async () => {
//   const CLI = new ethereumClient.Client({
//     network: "testnet",
//     phrase:
//       "expose blush snake marriage lock crop group define today such indoor school",
//   });
//   const memo = "=:THOR.RUNE:tthor1fcaf3n4h34ls3cu4euwl6f7kex0kpctkf5p8d7";

//   const txId = await CLI.transfer({
//     asset: AssetETH,
//     amount: baseAmount(0.0001 * 10 ** 8),
//     memo,
//   });
//   console.log(
//     `https://viewblock.io/thorchain/tx/${txId}?network=testnet`,
//     txId
//   );
// };
const Swap = () => {
  useEffect(() => {
    getAllPools();
  }, []);
  const [eth, setEth] = useState(null);
  const [PoolsMidgard, setPoolsMidgard] = useState(null);
  const [availablePools, setAvailablePools] = useState(null);
  const midgardService = new MidgardService();
  const ethUtilsService = new EthUtilsService();
  const transactionUtilsService = new TransactionUtilsService();

  //Contract getting here
  const abi = environment.network === "testnet" ? TCRopstenAbi : TCAbi;
  const contract = new ethers.Contract(
    "0xefA28233838f46a80AaaC8c309077a9ba70D123A",
    abi
  );
  console.log("++++++++++++++++++++++++++++++++++++++", contract);

  //token to native swap
  const USDTTORUNESWAP = async () => {
    const CLI = new ethereumClient.Client({
      network: "testnet",
      phrase:
        "expose blush snake marriage lock crop group define today such indoor school",
    });
    console.log("here");

    const CLITHOR = new thorchainClient.Client({
      network: "testnet",
      phrase:
        "expose blush snake marriage lock crop group define today such indoor school",
    });
    console.log(
      "baseAmount(1000000, 8),<><><><><><><><><><<><><><><><><><><",
      baseAmount(1000000, 8),
      baseAmount(1000000, 8).amount()
    );
    const selectedTargetAsset =
      "ETH.USDT-0XA3910454BF2CB59B8B3A401589A3BACC5CA42306";

    function isRune(asset) {
      return asset && asset.ticker === "RUNE"; // covers BNB and native
    }
    const toRune = isRune(selectedTargetAsset) ? true : false;
    console.log("to rune>>>>>>", toRune);
    console.log("availablePools", availablePools);
    const poolDetail = toRune
      ? availablePools.data.find(
          (pool) => pool.asset === assetToString(selectedTargetAsset)
        )
      : availablePools.data.find(
          (pool) => pool.asset === assetToString(selectedTargetAsset)
        );
    const pool = {
      assetBalance: baseAmount(availablePools.data[1].assetDepth),
      runeBalance: baseAmount(availablePools.data[1].assetDepth),
    };
    const thorAddress = CLITHOR.getAddress();

    /**
     * Slip percentage using original input
     */
    let slips = getSwapSlip(
      baseAmount(1000000000000000000000000),
      pool,
      toRune
    );
    slips = slips.toNumber();

    console.log("slip---000000000000000000000000000000->>>>>>>>>>>", slips);
    /**
     * TO SHOW BASE PRICE
     */
    const valueOfRuneInAsset = getValueOfRuneInAsset(
      assetToBase(assetAmount(1)),
      pool
    );
    const valueOfAssetInRune = getValueOfAssetInRune(
      assetToBase(assetAmount(1)),
      pool
    );

    const basePrice = toRune ? valueOfRuneInAsset : valueOfAssetInRune;
    this.basePrice = basePrice
      .amount()
      .div(10 ** 8)
      .toNumber();
    let inboundFees;
    let outboundFees;
    const asset = pool.asset;

    const assetOutboundFee = transactionUtilsService.calculateNetworkFee(
      asset,
      this.inboundAddresses,
      "OUTBOUND",
      pool
    );
    //working on trx utils . servie
    const assetInboundFee = ethUtilsService.txUtilsService.calculateNetworkFee(
      asset,
      this.inboundAddresses,
      "INBOUND",
      pool
    );
    const inboundFee = inboundFees[assetToString(selectedTargetAsset)];
    const outboundFee = outboundFees[assetToString(selectedTargetAsset)];
    const outboundFeeInSourceVal = basePrice * outboundFee;

    this.networkFeeInSource = inboundFee + outboundFeeInSourceVal;

    /**
     * Total output amount in target units minus 1 RUNE
     */
    const swapOutput = getSwapOutput(
      baseAmount(
        this._sourceAssetTokenValue
          .amount()
          .minus(assetToBase(assetAmount(inboundFee)).amount())
      ),
      pool,
      toRune
    );
    console.log("swapOutput<<<>>><<<<>>><<<<>>><<<>>>", swapOutput);

    // sub
    const totalAmount = baseAmount(
      swapOutput.amount().minus(assetToBase(assetAmount(outboundFee)).amount())
    );
    console.log("totalAmount<<>>>><<<<<>>>><<<>>", totalAmount);
    //ETH inbound Address
    const to_address = "0x62a180a09386a07235b9482f2f2c30279c6cc0f7";
    //MEMO to swap ETH.USDT to THOR.RUNE
    const Memo =
      "=:THOR.RUNE:tthor1fcaf3n4h34ls3cu4euwl6f7kex0kpctkf5p8d7:slips";
    //ABI here
    const abi = environment.network === "testnet" ? TCRopstenAbi : TCAbi;
    console.log("here");
    const contract = new ethers.Contract(
      "0xefA28233838f46a80AaaC8c309077a9ba70D123A",
      abi
    );
    console.log("++++++++++++++++++++++++++++++++++++++", contract);
    console.log("here");
    // const decimals = ethUtilsService.getAssetDecimal(
    //   assetFromString("ETH.USDT-0XA3910454BF2CB59B8B3A401589A3BACC5CA42306"),
    //   CLI
    // );
    // console.log("decimals<><><><><><><>", decimals);
    // let amount = assetToBase(assetAmount(1, 18)).amount();
    // console.log("amount<><><><><><><><><><><><><>", amount);
    const txId = await ethUtilsService.callDeposit({
      inboundAddress: eth,
      asset: assetFromString(
        "ETH.USDT-0XA3910454BF2CB59B8B3A401589A3BACC5CA42306"
      ),
      amount: 1,
      memo: Memo,
      ethClient: CLI,
    });
    console.log(
      `https://viewblock.io/thorchain/tx/${txId}?network=testnet`,
      txId
    );

    return txId;
  };
  //token to token swap
  const USDTTOXRUNEWAP = async () => {
    const CLI = new ethereumClient.Client({
      network: "testnet",
      phrase:
        "expose blush snake marriage lock crop group define today such indoor school",
    });
    console.log("here");
    //ETH inbound Address
    const to_address = "0x62a180a09386a07235b9482f2f2c30279c6cc0f7";
    //MEMO to swap ETH.USDT to ETH.XRUNE
    const Memo =
      "=:ETH.XRUNE-0X8626DB1A4F9F3E1002EEB9A4F3C6D391436FFC23:0x05ad7dd40fa9457f703191211bd4cb989fd06cbf";
    //ABI here
    const abi = environment.network === "testnet" ? TCRopstenAbi : TCAbi;
    console.log("here");
    const contract = new ethers.Contract(
      "0xefA28233838f46a80AaaC8c309077a9ba70D123A",
      abi
    );
    console.log("++++++++++++++++++++++++++++++++++++++", contract);
    console.log("here");
    // const decimals = ethUtilsService.getAssetDecimal(
    //   assetFromString("ETH.USDT-0XA3910454BF2CB59B8B3A401589A3BACC5CA42306"),
    //   CLI
    // );
    // console.log("decimals<><><><><><><>", decimals);
    // let amount = assetToBase(assetAmount(1, 18)).amount();
    // console.log("amount<><><><><><><><><><><><><>", amount);
    const txId = await ethUtilsService.callDeposit({
      inboundAddress: eth,
      asset: assetFromString(
        "ETH.USDT-0XA3910454BF2CB59B8B3A401589A3BACC5CA42306"
      ),
      amount: 100000,
      memo: Memo,
      ethClient: CLI,
    });
    console.log(
      `https://viewblock.io/thorchain/tx/${txId}?network=testnet`,
      txId
    );

    return txId;
  };

  let inboundAddress;
  // (async () => {
  //   const { data } = await midgardService.getInboundAddresses();
  //   inboundAddress = data[1].address;
  //   console.log(
  //     "Inbound Address coming from here ==========================>",
  //     data[1].address
  //   );
  // })();
  console.log("here");
  const getAllPools = async () => {
    const callGetInboundAddresses = await midgardService.getInboundAddresses();
    const callGetPools = await midgardService.getPools();
    const callNetwork = await midgardService.getNetwork();
    setAvailablePools(callGetPools);
    const callConstants = await midgardService.getConstants();
    setEth(callGetInboundAddresses.data[3]);
    setPoolsMidgard(callGetPools.data[3]);
    console.log(
      "callGetInboundAddresses.data[3]",
      callGetInboundAddresses.data[3]
    );
    setPoolsMidgard(callGetPools.data[5]);
    return callGetPools;
  };

  console.log("Midgard Pools <><>", setPoolsMidgard);

  // const swapSlip = all.getSwapSlip(assetToBase(assetAmount(1,18)),{assetDepths,runeDepths},false);
  // console.log("Swapppp sliiiipppp---------------------->",swapSlip);
  return (
    <div>
      <button onClick={USDTTORUNESWAP}>USDTTORUNESWAP</button>
      <button onClick={USDTTOXRUNEWAP}>SwapFromMain.js</button>
      <button onClick={getAllPools}>getAllPools</button>
    </div>
  );
};

export default Swap;
