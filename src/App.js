/** @format */

import {
  generatePhrase,
  encryptToKeyStore,
  decryptFromKeystore,
} from "@xchainjs/xchain-crypto";
import React, { Component, useEffect } from "react";
import { Button, Container, Header, Segment, Grid } from "semantic-ui-react";
import "./App.css";
import { Network } from "@xchainjs/xchain-client";
import { Client as binanceClient } from "@xchainjs/xchain-binance";
import { Client as bitcoinClient } from "@xchainjs/xchain-bitcoin";
import { Client as thorchainClient } from "@xchainjs/xchain-thorchain";
import { Client as ethereumClient } from "@xchainjs/xchain-ethereum/lib";
import { Client as litecoinClient } from "@xchainjs/xchain-litecoin";
import { Client as bitcoinCashClient } from "@xchainjs/xchain-bitcoincash";
import { EthUtilsService } from "../src/services/eth-utils.service";
import {
  AssetRuneNative,
  BaseAmount,
  assetAmount,
  assetToBase,
  baseAmount,
  AssetETH,
  AssetBNB,
  assetFromString,
  assetToString,
  AssetCurrencySymbol,
  currencySymbolByAsset,
  BNBChain,
  AssetRuneERC20,
} from "@xchainjs/xchain-util";
import * as types from "@xchainjs/xchain-util";
import * as asset from "@xchainjs/xchain-util";
import { MidgardService } from "./services/midgard.service";
import { environment } from "./environments";
import { Client as PolkadotClient } from "@xchainjs/xchain-polkadot";
import { Client as CosmosXchainClient } from "@xchainjs/xchain-cosmos";
import BigNumber from "bignumber.js";
// import Swap from "@binance-chain/javascript-sdk/lib/client/swap";
import { ClaimMsg } from "@binance-chain/javascript-sdk/lib/types";
import { ethers } from "ethers";
import { TCAbi, TCRopstenAbi } from "../src/app/_abi/thorchain.abi";
import Swap from "./swap";
import Withdraw from "./withdraw";

function App() {
  const midgardService = new MidgardService();
  const ethUtilsService = new EthUtilsService();
  const [response, setResponse] = React.useState("");
  const [input, setInput] = React.useState("");
  const [fileKeyStore, setfileKeyStore] = React.useState("");

  // Asset modueles coming from here
  let ass = asset;
  console.log("Assets Moduele I am here ============>", ass);
  console.log(ass.assetAmount);

  let key;
  let fileReader;
  let res;
  let phrase;
  // let userThorchainClient

  //Generation of Random Phrase and Encryption is going on here
  const keystore = async () => {
    try {
      phrase = generatePhrase();
      console.log(phrase);
      key = await encryptToKeyStore(phrase, input);
      // console.log('key========>', key)

      /*File Downloading function is called here to download the Text File*/
      downloadTextFile();
    } catch (error) {
      console.log(error);
    }
  };

  /*File creation and saving here*/
  const downloadTextFile = () => {
    const element = document.createElement("a");
    console.log("keyy=====>>", key);
    const file = new Blob([JSON.stringify(key)], {
      type: "text/plain;charset=utf-8",
    });
    element.href = URL.createObjectURL(file);
    element.download = "Thor_Custom_Keystore";
    document.body.appendChild(element);
    element.click();
  };

  //File Decryption is going here
  const decryptKeyStore = async () => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(fileKeyStore);
  };

  //send Transaction
  const sendTransaction = async () => {
    const userEthereumClient = new ethereumClient({
      network: "testnet",
      phrase: res,
      etherscanApiKey: environment.etherscanKey,
      infuraCreds: { projectId: environment.infuraProjectId },
    });
  };

  // const swapTransaction = async ()=>{
  //   const userEthereumClient = new ethereumClient({
  //     network:'testnet',
  //     phrase:res,
  //     etherscanApiKey: environment.etherscanKey,
  //     infuraCreds: { projectId: environment.infuraProjectId },
  //   });
  //   console.log("User Ethereum Client: MidgardService---------------> ", userEthereumClient.getAddress());
  //   const to_address= '0xf50dc8f6670b1c4f85565fc6dc8c316578a4fadd';
  //   const send_amount = baseAmount(10000, 6);
  //   const memo = 'swap:ETH.BNB:tbnb1ftzhmpzr4t8ta3etu4x7nwujf9jqckp3th2lh0'

  //   const result = await userEthereumClient.deposit({
  //   asset: AssetBNB,
  //   amount: send_amount,
  //   memo,
  //   })
  //   console.log(result)      console.log('THORChain Balance: ---------------> ', balanceThor);
  //   }

  //File handiling is done here and getting the menomics after the decryption of the file data is done here
  const handleFileRead = async (e) => {
    const content = JSON.parse(fileReader.result);
    console.log("content", content);
    res = await decryptFromKeystore(content, input);
    console.log("decryption=====>", res);

    //Network is defined here for all the general networks
    const network =
      environment.network === "testnet" ? Network.Testnet : Network.Mainnet;
    console.log("Enabled Network: ---------------> ", network);
    //Binance Address is getting from here
    const userBinanceClient = new binanceClient({ network, phrase: res });
    let BinanceClientAddress = userBinanceClient.getAddress();
    console.log(
      "User Binance Client address: ---------------> ",
      BinanceClientAddress
    );
    //Transactions history of Binance Client getting here

    const BinanceBalance = await userBinanceClient.getBalance(
      BinanceClientAddress
    );

    console.log("Binance Balance: ---------------> ", BinanceBalance);
    for (let i = 0; i < BinanceBalance.length; i++) {
      console.log(
        "Binance Balance: ---------------> ",
        BinanceBalance[i].amount.amount()
      );
    }
    const transationResultOfBinanceClient =
      await userBinanceClient.getTransactions({
        address: BinanceClientAddress,
      });
    console.log(
      "Transaction Data of Binance CLient",
      transationResultOfBinanceClient
    );

    //Binance Transaction of swap

    //Ethereum Transaction is doing here584849890757910104

    //Bitcoin Client is set here
    const userBtcClient = new bitcoinClient({
      network,
      phrase: res,
      sochainUrl: "https://sochain.com/api/v2",
      blockstreamUrl: "https://blockstream.info",
    });
    //Bitcoin Client is Address generating from here
    console.log(
      "User Btc Client: ---------------> ",
      userBtcClient.getAddress()
    );
    let addressBtc = userBtcClient.getAddress();
    console.log("BTC Address: ---------------> ", addressBtc);
    //Balance of Bitcoin is getting from here
    const balanceBtc = await userBtcClient.getBalance(addressBtc);
    console.log("balance: ---------------> ", balanceBtc[0].amount.amount());
    //Transactions history of BTC Client getting here
    const transationResultOfBTCClient = await userBtcClient.getTransactions({
      address: addressBtc,
    });
    console.log("Transaction Data of BTC CLient", transationResultOfBTCClient);
    // Ethservices
    // const balances = bncBalances.map((balance) => {
    //   const asset = assetFromString(`BNB.${balance.symbol}`);

    //   return {
    //     asset,
    //     amount: assetToBase(assetAmount(balance.free, 8)),
    //     frozenAmount: assetToBase(assetAmount(balance.frozen, 8)),
    //   };
    // });

    //Thorchain Client is set here
    const userThorchainClient = new thorchainClient({ network, phrase: res });
    console.log(
      "User Thorchain Client: ---------------> ",
      userThorchainClient
    );

    //Thorchain Address is generation from here
    const thorAddress = await userThorchainClient.getAddress();
    console.log("THORChain Address: ---------------> ", thorAddress);

    // const Thorprovider = userThorchainClient.getProvider();
    // const thoorbalance = await provider.getBalance(thorAddress);
    // console.log("//////////////////////,,,,,,,,,,,,,,,,,,,,",thoorbalance);

    //Balance of THORChain is getting from here "transfer"
    const balanceThor = await userThorchainClient.getBalance(thorAddress);

    for (let i = 0; i < balanceThor.length; i++) {
      console.log("THORChain Balance: ---------------> ", balanceThor);
      console.log(
        "THORChain Balance: ---------------> ",
        balanceThor[i].amount.amount()
      );
    }
    //Transactions history of Thorchain Client getting here
    const transationResultOfTHORChain =
      await userThorchainClient.getTransactions({ address: thorAddress });
    console.log(
      "Transaction Data of THORChain CLient",
      transationResultOfTHORChain
    );

    // Ethereum CLinet is set here
    const userEthereumClient = new ethereumClient({
      network: "testnet",
      phrase: res,
      etherscanApiKey: environment.etherscanKey,
      infuraCreds: { projectId: environment.infuraProjectId },
    });
    // //Ethereum Client Address is generation from here
    // console.log("User Ethereum Client: ---------------> ", userEthereumClient.getAddress());
    //Ethereum CLient Provider is printing here
    const provider = userEthereumClient.getProvider();
    console.log("Ethereum Provider: ---------------> ", provider);
    // //Ethereum Balance is getting from here

    let addressEth = userEthereumClient.getAddress();

    const ethBalance = await provider.getBalance(addressEth);
    // console.log("Ethereum Balance: ---------------> ", ethBalance.toString());

    console.log("Ethereum Address: ---------------> ", addressEth);
    //Ethereum Client Balance is getting from here
    const balance1eth = await userEthereumClient.getBalance(addressEth);
    const assetofeth = await ass.AssetETH;

    for (let i = 0; i < balance1eth.length; i++) {
      console.log("Ethereum Balance: ---------------> ", ethBalance);
      // console.log("Ethereum Client Balance: ---------------> ",ethBalance[i].amount.amount());
    }

    console.log("Ethereum Assets is coming here ========>", assetofeth);

    //LTC Client is setup here
    const userLtcClient = new litecoinClient({
      network,
      phrase: res,
    });
    // LTC Client Address generation is done here
    let addressLTC = userLtcClient.getAddress();
    console.log("User LTC Client: ---------------> ", addressLTC);
    //LTC Client Balance is getting from here
    const balanceLTC = await userLtcClient.getBalance(addressLTC);
    console.log("LTC Client Balance: ---------------> ", balanceLTC);
    //Transactions history of LTC Client getting here
    const transationResultOfLTC = await userLtcClient.getTransactions({
      address: addressLTC,
    });
    console.log("Transaction Data of LTC CLient", transationResultOfLTC);

    //BCH Client is setup here
    const userbchClient = new bitcoinCashClient({ network, phrase: res });
    //BCH Client Address generation is done here
    let addressBCH = userbchClient.getAddress();
    console.log("User BCH Client: ---------------> ", addressBCH);
    //BCH Client Balance getting is done here
    const balanceBCH = await userbchClient.getBalance(addressBCH);
    console.log("LTC Client Balance: ---------------> ", balanceBCH);
    //Transaction History of BCH Client getting here
    const transationResultOfBCH = await userbchClient.getTransactions({
      address: addressBCH,
    });
    console.log("Transaction Data of LTC CLient", transationResultOfBCH);

    //PolkaDot Client is setup here
    const userPolkaDotClient = new PolkadotClient({
      network: "testnet",
      phrase: res,
    });
    console.log(
      "User PolkaDot Client: ---------------> ",
      userPolkaDotClient.getAddress()
    );

    //     poolName
    //   )=> {
    //     const asset = new Asset(poolName);
    //     const assetAddress = asset.symbol.slice(asset.ticker.length + 1);
    //     const strip0x =
    //       assetAddress.substr(0, 2).toUpperCase() === '0X'
    //         ? assetAddress.substr(2)
    //         : assetAddress;
    //     const checkSummedAddress = ethers.utils.getAddress(strip0x);
    //     return {
    //       chain: asset.chain,
    //       ticker: asset.ticker,
    //       symbol: `${asset.ticker}-${checkSummedAddress}`,
    //     };
    //   };

    //   const pools = await this.midgardService.getPools().toPromise();
    //   const ethTokenPools = pools
    //     .filter((pool) => pool.asset.indexOf('ETH') === 0)
    //     .filter((ethPool) => ethPool.asset.indexOf('-') >= 0);

    //   for (const token of ethTokenPools) {
    //     // const tokenAsset = checkSummedAsset(token.asset);
    //     // assetsToQuery.push(tokenAsset);
    //   }
    //  console.log("Poolssss here ------------------------>",pools);

    //Inbound Addresses here for the pools

    const pools = new MidgardService();
    let inboundAddress;
    (async () => {
      const { data } = await pools.getInboundAddresses();
      inboundAddress = data[1].address;
      console.log(
        "Inbound Address coming from here ==========================>",
        data[1].address
      );
    })();

    const swapBNBToRuneNative = async () => {
      const destAddress = userBinanceClient.getAddress();
      console.log(
        "User Binance Client: >>>>>>>>>>>>>>>>>>>>>>>>>---------------> ",
        destAddress
      );
      const to_address = "tbnb1gr3zze7zkz2x6p08qnl88rhd22vpypmafeplr7";
      const send_amount = baseAmount(100000, 6);
      const Memo = "=:THOR.RUNE:tthor1fcaf3n4h34ls3cu4euwl6f7kex0kpctkf5p8d7";

      // const assetString = assetFromString('BNB.BUSD-BD1');
      // console.log('assetString------------------------', assetString);
      const result = await userBinanceClient.transfer({
        asset: AssetBNB,
        amount: send_amount,
        recipient: to_address,
        memo: Memo,
      });
      console.log("i am here =======================>", result);

      return result;
    };
    // swapBNBToRuneNative();
    (async () => {})();

    //Swap Rune to BNB
    const swapRuneToBNB = async () => {
      const destAddress = userThorchainClient.getAddress();
      console.log(
        "User Thorchain Client: >>>>>>>>>>>>>>>>>>>>>>>>>---------------> ",
        destAddress
      );
      const to_address = "tthor1mrckazz7l67tz435dp9m3qaygzm6xmsqeglrj8";
      const send_amount = baseAmount(2000000000, 8);
      const Memo =
        "=:BNB.BNB:tbnb1yc20slera2g4fhnkkyttqxf70qxa4jtm42qq4t:63097111";

      // const assetString = assetFromString('BNB.BUSD-BD1');
      // console.log('assetString------------------------', assetString);
      const result = await userThorchainClient.transfer({
        asset: AssetRuneNative,
        amount: send_amount,
        recipient: to_address,
        memo: Memo,
      });
      console.log("i am here =======================>", result);

      return result;
    };
    // swapRuneToBNB();
    (async () => {})();

    //Swap Rune to ETH
    const swapRuneToETH = async () => {
      const destAddress = userEthereumClient.getAddress();
      console.log(
        "User Ethereum Client: >>>>>>>>>>>>>>>>>>>>>>>>>---------------> ",
        destAddress
      );
      // const to_address = "0x62a180a09386a07235b9482f2f2c30279c6cc0f7";
      // const send_amount = baseAmount(20000000000, 8);
      const Memo =
        "=:ETH.ETH:0x05ad7dd40fa9457f703191211bd4cb989fd06cbf:161891111";

      // const assetString = assetFromString('BNB.BUSD-BD1');
      // console.log('assetString------------------------', assetString);
      const result = await userEthereumClient.deposit({
        asset: AssetETH,
        amount: baseAmount(2 * 10 ** 8),
        // recipient: to_address,
        memo: Memo,
      });
      console.log("i am here =======================>", result);

      return result;
    };
    // swapRuneToETH();
    (async () => {})();

    //Swap USDT to RUNE
    const USDTtoRUNE = async () => {
      const destAddress = userEthereumClient.getAddress();
      console.log(
        "User Binance  Client: >>>>>>>>>>>>>>>>>>>>>>>>>---------------> ",
        destAddress
      );
      // const to_address = "0x62a180a09386a07235b9482f2f2c30279c6cc0f7";
      // const send_amount = baseAmount(20000000000, 8);
      const Memo = "=:THOR.RUNE:tthor1fcaf3n4h34ls3cu4euwl6f7kex0kpctkf5p8d7";

      // const assetString = assetFromString('BNB.BUSD-BD1');
      // console.log('assetString------------------------', assetString);
      const result = await userEthereumClient.transfer({
        asset: AssetETH,
        amount: baseAmount(0.0001 * 10 ** 18),
        // recipient: to_address,
        memo: Memo,
      });
      console.log("i am here =======================>", result);

      return result;
    };
    //USDTtoRUNE();
    (async () => {})();

    //Swap RUNE to BUSD(BEP20)
    const RUNETOBUSD = async () => {
      const destAddress = userThorchainClient.getAddress();
      console.log(
        "User Binance  Client: >>>>>>>>>>>>>>>>>>>>>>>>>---------------> ",
        destAddress
      );
      // const to_address = "0x62a180a09386a07235b9482f2f2c30279c6cc0f7";
      // const send_amount = baseAmount(20000000000, 8);
      const Memo = "=:BNB.BUSD-BAF:tbnb1yc20slera2g4fhnkkyttqxf70qxa4jtm42qq4t";

      // const assetString = assetFromString('BNB.BUSD-BD1');
      // console.log('assetString------------------------', assetString);
      const result = await userThorchainClient.deposit({
        asset: AssetRuneNative,
        amount: baseAmount(20 * 10 ** 8),
        // recipient: to_address,
        memo: Memo,
      });
      console.log("i am here =======================>", result);

      return result;
    };
    // RUNETOBUSD();
    (async () => {})();

    const userCosmosXchainClient = new CosmosXchainClient({
      network: "testnet",
      phrase: res,
    });

    // ETH.USDT-0XA3910454BF2CB59B8B3A401589A3BACC5CA42306
    // const assetString = assetFromString('ETH.USDT-0XA3910454BF2CB59B8B3A401589A3BACC5CA42306');
    // console.log('assetString------------------------', assetString);

    //Contract getting here
    const abi = environment.network === "testnet" ? TCRopstenAbi : TCAbi;
    const contract = new ethers.Contract(
      "0xefA28233838f46a80AaaC8c309077a9ba70D123A",
      abi
    );
    console.log("++++++++++++++++++++++++++++++++++++++", contract);

    //Swap RUNE to BUSD(BEP20)
    const USDTTORUNESWAP = async () => {
      const destAddress = userThorchainClient.getAddress();
      //ETH inbound Address
      const to_address = "0x62a180a09386a07235b9482f2f2c30279c6cc0f7";
      //MEMO to swap ETH.USDT to THOR.RUNE
      const Memo = "=:THOR.RUNE:destAddress";
      //ABI here
      const abi = environment.network === "testnet" ? TCRopstenAbi : TCAbi;
      const contract = new ethers.Contract(
        "0xefA28233838f46a80AaaC8c309077a9ba70D123A",
        abi
      );
      console.log("++++++++++++++++++++++++++++++++++++++", contract);

      const result = await contract.deposit({
        inboundAddress: to_address,
        asset: assetFromString(
          "ETH.USDT-0XA3910454BF2CB59B8B3A401589A3BACC5CA42306"
        ),
        amount: baseAmount(0.02 * 10 ** 18),
        memo: Memo,
      });
      console.log("i am here =======================>", result);

      return result;
    };
    // USDTTORUNESWAP();
    (async () => {})();

    const checkBalanceOfCli = async () => {
      const destAddress = userBinanceClient.getAddress();
      console.log(
        "User Binance  Client: >>>>>>>>>>>>>>>>>>>>>>>>>---------------> ",
        destAddress
      );
      const balanceCLI = await userBinanceClient.getBalance(destAddress);
      console.log("XXXXXXXX>>>><<<>>>", balanceCLI);
      console.log("hey balance ===>>", balanceCLI[1].amount.amount());
      for (let i = 0; i < balanceCLI.length; i++) {
        console.log(
          balanceCLI[i].asset,
          Number(balanceCLI[i].amount.amount().c[0]) /
            Number(Math.pow(10, balanceCLI[i].amount.decimal))
        );
      }
      const assetofetch = await ass.assetFromString("BNB.BUSD-BAF");

      console.log("<><><><><><><><><><><><><><><><><><>", assetofetch);
    };
    // checkBalanceOfCli();
  };
  const convertAsset = async () => {
    const a = assetFromString(
      "ETH.USDT-0XA3910454BF2CB59B8B3A401589A3BACC5CA42306"
    );
    // return assetToString(a);

    console.log("Xxxxxxxxxxxxx>>>>>", a, assetToString(a));
  };
  convertAsset();
  //WITHDRAW FUNCTIONALITY
  // const params: DepositParam = {
  //   amount: baseAmount('0'), // what to set?
  //   memo: 'WITHDRAW:ETH.ETH:10000:THOR.RUNE'
  // }
  // await thorchainClient!.deposit(params)

  //Submit button to trigger the things
  const SubmitAll = async () => {
    console.log("password====>", typeof input);
    console.log("fileKeyStroe====>", typeof fileKeyStore);
    decryptKeyStore();
  };

  return (
    <>
      <Container>
        <Segment>
          <div>
            <h1>Thorchain Custom Keystore Maker</h1>
            <h4>Enter your Password</h4>
            <input
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button primary onClick={keystore}>
              Create KeyStore
            </Button>
          </div>
          <h1> Thorchain KeyStore Decryption </h1>
          <div>
            <h1>Enter your password</h1>
            {/* // <input id="password" value={input} onchange ={e=> setInput(e.target.value)}/> */}
          </div>
          <div>
            <input
              type="file"
              onChange={(e) => {
                setfileKeyStore(e.target.files[0]);
              }}
            />
            <button onClick={SubmitAll}>Upload!</button>
          </div>
          <button onClick={sendTransaction}>send Transaction</button>
          <button>Swap</button>

          <Swap />
          <Withdraw />
        </Segment>
      </Container>
    </>
  );
}

export default App;
