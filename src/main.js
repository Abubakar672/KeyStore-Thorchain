/** @format */

import { MidgardService } from "./services/midgard.service";
import { EthUtilsService } from "../src/services/eth-utils.service";
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
} = require("@xchainjs/xchain-util");
const blockchainClient = async () => {
  const CLI = new ethereumClient.Client({
    network: "testnet",
    phrase:
      "expose blush snake marriage lock crop group define today such indoor school",
  });
  const memo = "=:THOR.RUNE:tthor1fcaf3n4h34ls3cu4euwl6f7kex0kpctkf5p8d7";

  const txId = await CLI.transfer({
    asset: AssetETH,
    amount: baseAmount(0.0001 * 10 ** 8),
    memo,
  });
  console.log(
    `https://viewblock.io/thorchain/tx/${txId}?network=testnet`,
    txId
  );
};
const main = () => {
  const midgardService = new MidgardService();
  const ethUtilsService = new EthUtilsService();

  let inboundAddress;
  // (async () => {
  //   const { data } = await midgardService.getInboundAddresses();
  //   inboundAddress = data[1].address;
  //   console.log(
  //     "Inbound Address coming from here ==========================>",
  //     data[1].address
  //   );
  // })();

  const getAllPools = async () => {
    const callGetInboundAddresses = await midgardService.getInboundAddresses();
    const callGetPools = await midgardService.getPools();
    const callNetwork = await midgardService.getNetwork();
    const callConstants = await midgardService.getConstants();

    console.log(callGetPools);
  };

  return (
    <div>
      <button onClick={blockchainClient()}>blockchainClient</button>
      <button onClick={getAllPools}>getAllPools</button>
    </div>
  );
};

export default main;
