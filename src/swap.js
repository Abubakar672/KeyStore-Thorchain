/** @format */

import { MidgardService } from "./services/midgard.service";
import { EthUtilsService } from "./services/eth-utils.service";
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
  getSwapFee,
  getSwapOutputWithFee,
  getDoubleSwapOutputWithFee
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
    const selectedTargetAsset = "ETH.USDT-0XA3910454BF2CB59B8B3A401589A3BACC5CA42306";

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
      assetBalance: baseAmount(availablePools.data[6].assetDepth),
      runeBalance: baseAmount(availablePools.data[6].runeDepth),
 
    };
    
    //ETH Pool DATA 
    console.log("Pool Asset Depth coming here +++++++++++++ ",pool.assetBalance.amount());
    console.log("Pool Rune Depth coming here ++++++++++++++ ",pool.runeBalance.amount());

    const pool1 = {
      assetBalance: baseAmount(availablePools.data[0].assetDepth),
      runeBalance: baseAmount(availablePools.data[0].runeDepth),
    };
    const pool2 = {
      assetBalance: baseAmount(availablePools.data[3].assetDepth),
      runeBalance: baseAmount(availablePools.data[3].runeDepth),
    };
    // const thorAddress = CLITHOR.getAddress();

    //BCH.BCH pool data is coming here 
    console.log("Pool 1 rune depth is coming here +++++++", pool1.runeBalance.amount());
    console.log("Pool 1 Asset Depth coming here  +++++++",pool1.assetBalance.amount());

    //BNB.BNB pool data is coming here 
    console.log("Pool 2 rune depth is coming here +++++++", pool2.runeBalance.amount() );
    console.log("Pool 2 Asset Depth coming here  +++++++",pool2.assetBalance.amount());
    

    //SLIPPAGE FINALLY DONE  HERE
    let sliiping = getSwapOutput(baseAmount(0.1 * 10 ** 8), pool, isRune);
    // sliiping = sliiping *0.97;
    // sliiping = sliiping.toNumber();
    console.log("HELLLOO final SLIIPING HERE ----------->",(0.97*(sliiping.amount())));

    let testingFee = getSwapFee(baseAmount(0.1 *10 **8),pool,isRune);
    console.log("Fee -------------------->",testingFee.amount());

    let swapwithFee = getSwapOutputWithFee(baseAmount(0.1 *10 **8),pool,isRune,baseAmount(1));
    console.log("Swapout with Fee ----->",swapwithFee.amount());


    let finalizingSlip = 0.97 * (0.1* 3446744687 * 4684912878878) /(0.1 + 3446744687)**2;
    console.log("FINALIZING SLIPPAGE IS HERRR ------->",finalizingSlip );


    let doubleSlipping = getDoubleSwapSlip(baseAmount(0.1 *10 **8),pool,pool1);
    console.log("Getting double swap slip --------------->", doubleSlipping);

    let DifferentPools = getDoubleSwapOutput(baseAmount(0.1 * 10 ** 8), pool, pool1);
    console.log("Finale slippage of 2 diffferent pools without fee ++++++", ((DifferentPools.amount())));


    let DifferentPool = getDoubleSwapOutputWithFee(baseAmount(0.01 * 10 ** 8), pool2, pool1 ,baseAmount());
    console.log("Finale slippage of 2 diffferent pools ++++++", (DifferentPool.amount()));

    let gettingSwapSlip = getSwapSlip(baseAmount(72.1221 * 10 ** 8),pool1,false)
   

    console.log("Slippppp ()()()()()()()()()()()(()) ---------->",(gettingSwapSlip));
    console.log("Polll data here  ---------------->",pool);
    // console.log("Swap Slip %%%%%%%%%", ((gettingSwapSlip.c[1]-gettingSwapSlip.c[0])/gettingSwapSlip.c[0])*100);

    
    // let slips = getSwapSlip(baseAmount(1* 10 ** 8), pool, toRune);
    // // console.log("Poolllll is comingcoming here --------->",pool);
    // slips = slips*0.95;
    // // slips = slips.toNumber();
    // console.log("Get Swap Slip  ------------->",slips);
    // let finalSlip = slips*0.95;
    // console.log("Final Slippage is coming here ------->",finalSlip);
    
    // console.log("HELLLLOoo----------->",pool1);
    // console.log("Hellllooo11111 -------->",pool2);
    // //getting the double swapping here 
    // let getDoubleSwap = getSwapFee(baseAmount(1 * 10 ** 18),pool,toRune);
    // // console.log("HEEEEEEEEEEEEELLLLLLLLLLLLLLLLOOOOOOOOOOO ======================>",pool1)
    // console.log("Double SWAP FEEE ->>>>>>>>>>>",getDoubleSwap.amount());
    
    // // const swapSlip = all.getSwapSlip(
    // //   "1000000",
    // //   { assetBalance: "BASE", runeBalance: "BASE" },
    // //   true
    // // );
    // //ETH inbound Address
    // const to_address = "0x62a180a09386a07235b9482f2f2c30279c6cc0f7";
    // //MEMO to swap ETH.USDT to THOR.RUNE
    // const Memo = "=:THOR.RUNE:tthor1fcaf3n4h34ls3cu4euwl6f7kex0kpctkf5p8d7:slips";
    // //ABI here
    // const abi = environment.network === "testnet" ? TCRopstenAbi : TCAbi;
    // console.log("here");
    // const contract = new ethers.Contract(
    //   "0xefA28233838f46a80AaaC8c309077a9ba70D123A",
    //   abi
    // );
    // console.log("++++++++++++++++++++++++++++++++++++++", contract);
    // console.log("here");
    // // const decimals = ethUtilsService.getAssetDecimal(
    // //   assetFromString("ETH.USDT-0XA3910454BF2CB59B8B3A401589A3BACC5CA42306"),
    // //   CLI
    // // );
    // // console.log("decimals<><><><><><><>", decimals);
    // // let amount = assetToBase(assetAmount(1, 18)).amount();
    // // console.log("amount<><><><><><><><><><><><><>", amount);
    // const txId = await ethUtilsService.callDeposit({
    //   inboundAddress: eth,
    //   asset: assetFromString(
    //     "ETH.USDT-0XA3910454BF2CB59B8B3A401589A3BACC5CA42306"
    //   ),
    //   amount: 1,
    //   memo: Memo,
    //   ethClient: CLI,
    // });
    // console.log(
    //   `https://viewblock.io/thorchain/tx/${txId}?network=testnet`,
    //   txId
    // );

    // return txId;
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
    setPoolsMidgard(callGetPools.data[1]);
    return callGetPools;
  };

  console.log("Midgard Pools <><>", setPoolsMidgard);
  console.log("HHHHHHHHHHHHHHHH---------------------------->",midgardService)

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
