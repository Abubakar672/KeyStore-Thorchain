/** @format */

import { MidgardService } from "./services/midgard.service";
import { EthUtilsService } from "./services/eth-utils.service";
import { ethers } from "ethers";
import { environment } from "./environments";
import { TCAbi, TCRopstenAbi } from "./app/_abi/thorchain.abi";
import React, { useState, useEffect } from "react";
const thorchainClient = require("@xchainjs/xchain-thorchain");
const binanceClient = require("@xchainjs/xchain-binance");
const bitcoinClient = require("@xchainjs/xchain-bitcoin");
const ethereumClient = require("@xchainjs/xchain-ethereum/lib");
const litecoinClient = require("@xchainjs/xchain-litecoin");
const bitcoinCashClient = require("@xchainjs/xchain-bitcoincash");
const polkadotClient = require("@xchainjs/xchain-polkadot");
// import { polkadotClient } from "@xchainjs/xchain-polkadot";
const cosmosXchainClient = require("@xchainjs/xchain-cosmos");

const {
  AssetRuneNative,
  AssetBNB,
  baseAmount,
  AssetETH,
  assetToBase,
  assetAmount,
  assetFromString,
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
const Withdraw = () => {
  useEffect(() => {
    getAllPools();
  }, []);
  const [eth, setEth] = useState(null);
  const midgardService = new MidgardService();
  const ethUtilsService = new EthUtilsService();

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
    //ETH inbound Address
    const to_address = "0x62a180a09386a07235b9482f2f2c30279c6cc0f7";
    //MEMO to swap ETH.USDT to THOR.RUNE
    const Memo = "=:THOR.RUNE:tthor1fcaf3n4h34ls3cu4euwl6f7kex0kpctkf5p8d7";
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
  //WITHDRAW:ETH.XRUNE
  const WITHDRAW_ETH_XRUNE = async () => {
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
      "WITHDRAW:ETH.XRUNE-0X8626DB1A4F9F3E1002EEB9A4F3C6D391436FFC23:1500";
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
        "ETH.XRUNE-0X8626DB1A4F9F3E1002EEB9A4F3C6D391436FFC23"
      ),
      amount: 1000000000000000000,
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
    const callConstants = await midgardService.getConstants();
    setEth(callGetInboundAddresses.data[3]);
    console.log(callGetInboundAddresses.data[3]);
  };

  return (
    <div>
      <button onClick={WITHDRAW_ETH_XRUNE}>WITHDRAW_ETH_XRUNE.js</button>
      <button onClick={getAllPools}>getAllPools</button>
    </div>
  );
};

export default Withdraw;
